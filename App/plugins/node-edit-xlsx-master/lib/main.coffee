'use strict'

fs = require 'fs'
path = require 'path'
temp = require('temp').track()
mkdirp = require 'mkdirp'
Zip = require 'node-zip'
Libxmljs = require 'libxmljs'
_ = require 'underscore'

NS =
  def: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'


Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc


class EditXlsx
  @defaults: preserveCurrentValue: false, overwrite: true

  constructor: (xlsxPath) ->
    @cwd = process.cwd()
    @tempDir = temp.mkdirSync()
    @sharedStrings = new SharedStrings @tempDir
    @sheets = []
    @files = []

    opts = encoding: 'binary'
    data = fs.readFileSync xlsxPath, opts
    zip = new Zip data, base64: false, checkCRC32: true

    process.chdir @tempDir

    for filepath, obj of zip.files
      if obj.options.dir
        mkdirp.sync obj.name
        continue
      @files.push obj.name
      fs.writeFileSync obj.name, obj.asBinary(), opts

    process.chdir @cwd

  sheet: (sheetNum) ->
    @curSheetNum = sheetNum
    @sheets[sheetNum] ||= new Sheet @, sheetNum + 1

  save: (xlsxPath, opts) ->
    opts = _.extend {}, EditXlsx.defaults, opts
    return false if fs.existsSync(xlsxPath) and not opts.overwrite
    sheet.save opts for sheet in @sheets
    options = encoding: 'utf8'
    zip = new Zip()
    process.chdir @tempDir
    @files.forEach (path) -> zip.file path, fs.readFileSync path, options
    process.chdir @cwd
    data = zip.generate type: 'arraybuffer'
    buffer = new Buffer data.byteLength
    buffer[i] = data[i] for i in [0...buffer.length]
    fs.writeFileSync xlsxPath, buffer, options
    true


class Sheet
  constructor: (xlsx, num) ->
    @sharedStrings = xlsx.sharedStrings
    @path = path.join xlsx.tempDir, "xl/worksheets/sheet#{num}.xml"
    @doc = Libxmljs.parseXml fs.readFileSync @path
    @ns = @doc.root().namespace()
    @sheetData = @doc.get 'def:sheetData', NS
    @rows = []
    @cells = {}

  create: (name, content = '') ->
    el = new Libxmljs.Element @doc, name, content + ''
    el.namespace @ns
    el

  c: (addr) ->
    ref = @parseAddr addr
    @cells[ref.addr] ||= new Cell @, ref

  value: ->
    res = Array.prototype.slice.call(arguments).map (arg) => @c(arg).value
    if arguments.length is 1 then res[0] else res

  update: (addr, value) ->
    rowNum = @parseAddr(addr).row
    row = @rows[rowNum] ?= new Row @, rowNum
    @c(addr).value = value
    @

  save: (opts = {}) ->
    try
      xml = @doc.toString(false).replace /(<pageSetup .*?) r:id=".*?"(.*?>)/g,
        (str, p1, p2) -> p1 + p2
      unless opts.preserveCurrentValue?
        xml = xml.replace /(<f>.*?<\/f>|<f\/>)(<v>.*?<\/v>|<v\/>)/g,
          (str, p1, p2) -> p1
      fs.writeFileSync @path, xml
      true
    catch e
      false

  parseAddr: (addr) ->
    if _.isString addr
      {col, row} = @addr2Nums addr
      addr = addr
    else
      [col, row] = addr
      addr = @nums2Addr addr...
    col: col, row: row, addr: addr

  alphabet2Num: (alphabets) ->
    res = digit = 0
    for i in [(alphabets.length - 1)..0]
      c = alphabets.charCodeAt(i) - 64
      res += if digit is 0 then c else c * Math.pow 26, digit
      digit++
    res

  num2Alphabet: (num) ->
    res = ''
    while num--
      res = String.fromCharCode(65 + (num % 26)) + res
      num = Math.floor num / 26
    res

  addr2Nums: (addr) ->
    matches = addr.match /^([A-Z]+)(\d+)$/
    col: @alphabet2Num(matches[1]), row: +matches[2]

  nums2Addr: (col, row) ->
    @num2Alphabet(col) + row


class Row
  constructor: (@sheet, r) ->
    doc = @sheet.doc
    @xml = doc.get "//def:row[@r=\"#{r}\"]", NS
    unless @xml
      @xml = @sheet.create 'row'
      @xml.attr r: r
      dest = doc.get "//def:row[@r > #{r}]", NS
      dest?.addPrevSibling(@xml) ? @sheet.sheetData.addChild @xml


class Cell
  constructor: (@sheet, @ref) ->
    @xml = @sheet.doc.get "//def:c[@r=\"#{@ref.addr}\"]", NS

  @property 'value',
    get: ->
      if @_value == undefined
        if @xml
          v = @xml.get('def:v', NS)?.text()
          @_value = switch @xml.attr('t')?.value() ? 'n'
            when 'inlineStr'
              @xml.get('def:is', NS).childNodes().map (el) ->
                switch el.name()
                  when 't' then el.text()
                  when 'r' then el.get('def:t', NS).text()
              .join ''
            when 's' then @sheet.sharedStrings.get +v
            when 'b' then !!+v
            when 'e', 'str' then v
            else +v
        else
          @_value = null
      else
        @_value

    set: (value) ->
      row = @sheet.rows[@ref.row].xml
      unless @xml
        @xml = @sheet.create 'c'
        @xml.attr r: @ref.addr
        dest = null
        for el in row.childNodes()
          if @ref.col < (@sheet.parseAddr el.attr 'r').col
            dest = el
            break
        dest?.addPrevSibling(@xml) ? row.addChild @xml
      @empty()
      s = row.attr 's'
      @xml.attr s: s.value() if s and not @xml.attr 's'
      switch
        when _.isBoolean value
          @xml.attr t: 'b'
          @xml.addChild @sheet.create 'f', ('' + value).toUpperCase()
          @xml.addChild @sheet.create 'v', +value
        when _.isNumber value
          @xml.attr('t')?.remove()
          @xml.addChild @sheet.create 'v', value
        else
          @xml.attr t: 'inlineStr'
          el = @sheet.create 'is'
          @xml.addChild el.addChild @sheet.create 't', value
      @_value = value
      @

  empty: ->
    @xml.childNodes().forEach (el) -> el.remove()


class SharedStrings
  constructor: (tempDir) ->
    @path = path.join tempDir, 'xl/sharedStrings.xml'
    @cache = []

  get: (idx) ->
    return @cache[idx] ?=
      @table.get("//def:si[#{idx + 1}]", NS).childNodes().map (el) ->
        switch el.name()
          when 't' then el.text()
          when 'r' then el.get('def:t', NS).text()
      .join ''

  @property 'table',
    get: ->
      @_table ?= Libxmljs.parseXml fs.readFileSync @path


module.exports = EditXlsx

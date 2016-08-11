fs = require 'fs'
rewire = require 'rewire'

EditXlsx = rewire '../lib/main'

NS = EditXlsx.__get__ 'NS'
Row = EditXlsx.__get__ 'Row'


describe 'EditXlsx', ->
  beforeEach ->
    this.xlsx = new EditXlsx 'spec/template.xlsx'
    this.sheet = this.xlsx.sheet 0

  describe '#sheet (sheetNum)', ->
    it 'シートを一度開いたらキャッシュする', ->
      expect(this.sheet).toBe this.xlsx.sheet 0
      this.xlsx.sheet 1
      expect(this.xlsx.sheet 0).toBe this.sheet

  describe '#save (xlsxPath, opts)', ->
    path = 'spec/temp.xlsx'

    it 'opts.overwrite=falseなら上書きせず、falseが返る', ->
      flag = this.xlsx.save path, overwrite: false
      expect(flag).toBe true
      flag = this.xlsx.save path, overwrite: false
      expect(flag).toBe false

    it 'opts.overwrite=true(デフォルト)なら上書きし、trueが返る', ->
      flag = this.xlsx.save path
      expect(flag).toBe true
      flag = this.xlsx.save path, overwrite: true
      expect(flag).toBe true
      fs.unlinkSync path


describe 'Sheet', ->
  beforeEach ->
    this.xlsx = new EditXlsx 'spec/template.xlsx'
    this.sheet = this.xlsx.sheet 0

  describe '#create (name, content = "")', ->
    it '正しくXML要素が作られ、その要素が返る', ->
      el = this.sheet.create 'red', 'amazing!'
      expect(el.name()).toBe 'red'
      expect(el.text()).toBe 'amazing!'

    it 'contentは文字列になる(省略も可能)', ->
      el = this.sheet.create 'blue'
      expect(el.text()).toBe ''
      el = this.sheet.create 'green', 777
      expect(el.text()).toBe '777'

  describe '#c (addr)', ->
    it '一度参照したセルはキャッシュされる', ->
      expect(this.sheet.c 'A1').toBe this.sheet.c 'A1'

    it 'アドレス、列行どちらでも指定可能', ->
      expect(this.sheet.c 'B10').toBe this.sheet.c [2, 10]

  describe '#value', ->
    it '引数がひとつなら単体で、複数なら配列で結果が返る', ->
      expect(this.sheet.value 'A1').not.toEqual jasmine.any Array
      expect(this.sheet.value 'A1', 'B1').toEqual jasmine.any Array

    it 'アドレス、列行どちらでも指定可能', ->
      expect(this.sheet.value 'A2').toBe this.sheet.value [1, 2]
      expect(this.sheet.value 'A2', [2, 2]).toEqual this.sheet.value [1, 2], 'B2'

    describe '正しい値が返る', ->
      it '数値', ->
        v = this.sheet.value 'B3'
        expect(v).toEqual jasmine.any Number
        expect(v).toBe 12345

      it '真偽値', ->
        v = this.sheet.value 'C4'
        expect(v).toEqual jasmine.any Boolean
        expect(v).toBe true

      it '文字列', ->
        v = this.sheet.value 'A2'
        expect(v).toEqual jasmine.any String
        expect(v).toBe 'あいうえお'
        v = this.sheet.value 'A3'
        expect(v).toEqual jasmine.any String
        expect(v).toBe 'あいうえお'
        v = this.sheet.value 'D5'
        expect(v).toEqual jasmine.any String
        expect(v).toBe '#NAME?'

      it 'null(存在しないセル)', ->
        v = this.sheet.value 'AZ100'
        expect(v).toBeNull()

  describe '#update (addr, value)', ->
    it '一度参照した行はキャッシュされる', ->
      spyOn this.sheet, 'update'
      data = this.sheet.update.calls.all()
      this.sheet.update 'A20', 777
      r1 = data[0].object.rows[20]
      this.sheet.update 'B20', 777
      r2 = data[1].object.rows[20]
      expect(r1).toBe r2

    it '正しく更新される', ->
      this.sheet.update 'A1', 'うおおおぉっ！'
      expect(this.sheet.value 'A1').toBe 'うおおおぉっ！'
      this.sheet.update [3, 3], 777
      expect(this.sheet.value 'C3').toBe 777

    describe '存在しないセルの更新(新しく作られる)', ->
      it '<row>にs属性がある場合、それを引き継ぐ', ->
        [col, row, addr] = ['AZ', 1, 'AZ1']
        expect(this.sheet.value addr).toBeNull()
        this.sheet.update addr, 777
        s = this.sheet.rows[row].xml.attr 's'
        expect(s).not.toBeNull()
        expect(this.sheet.cells[addr].xml.attr('s').value()).toBe s.value()

      it '<row>にs属性がない場合、s属性を作らない', ->
        [col, row, addr] = ['AZ', 2, 'AZ2']
        expect(this.sheet.value addr).toBeNull()
        this.sheet.update addr, 777
        s = this.sheet.rows[row].xml.attr 's'
        expect(s).toBeNull()
        expect(this.sheet.cells[addr].xml.attr 's').toBeNull()

      it '値が真偽値として保存される', ->
        addr = 'AZ3'
        expect(this.sheet.value addr).toBeNull()
        this.sheet.update addr, true
        expect(this.sheet.value addr).toBe true

      it '値が数値として保存される', ->
        addr = 'AZ4'
        expect(this.sheet.value addr).toBeNull()
        this.sheet.update addr, 777
        expect(this.sheet.value addr).toBe 777

      it '値が文字列で保存される', ->
        addr = 'AZ5'
        expect(this.sheet.value addr).toBeNull()
        this.sheet.update addr, 'あいうえお'
        expect(this.sheet.value addr).toBe 'あいうえお'

  describe '#save (opts)', ->
    it 'opts.preserveCurrentValue=trueなら数式セルの<v>は保持され、false(デフォルト)なら削除される', ->
      readFile = (path) -> fs.readFileSync path, encoding: 'binary'
      re = /(?:<f>.*?<\/f>|<f\/>)(?:<v>.*?<\/v>|<v\/>)/g
      this.sheet.save preserveCurrentValue: true
      expect(readFile this.sheet.path).toMatch re
      this.sheet.save()
      expect(readFile this.sheet.path).not.toMatch re

    it '保存に成功するとtrueが、失敗するとfalseが返る', ->
      expect(this.sheet.save()).toBe true
      fs.chmodSync this.sheet.path, '444'
      expect(this.sheet.save()).toBe false

  describe '#parseAddr (addr)', ->
    it 'col:\d+, row:\d+, addr:[A-Z]+\d+から成るオブジェクトが返る', ->
      ref = this.sheet.parseAddr 'A10'
      expect(ref.col).toMatch /^\d+$/
      expect(ref.row).toMatch /^\d+$/
      expect(ref.addr).toMatch /^[A-Z]+\d+$/

    it 'アドレス、列行どちらでも指定可能', ->
      ref1 = this.sheet.parseAddr 'A10'
      ref2 = this.sheet.parseAddr [1, 10]
      expect(ref1).toEqual ref2
      ref1 = this.sheet.parseAddr 'AA10'
      ref2 = this.sheet.parseAddr [27, 10]
      expect(ref1).toEqual ref2

  describe '#alphabet2Num (alphabets)', ->
    it 'アルファベットを指定すると数値が返る', ->
      expect(this.sheet.alphabet2Num 'A').toBe 1
      expect(this.sheet.alphabet2Num 'AA').toBe 27

  describe '#num2Alphabet (num)', ->
    it '数値を指定するとアルファベットが返る', ->
      expect(this.sheet.num2Alphabet 1).toBe 'A'
      expect(this.sheet.num2Alphabet 27).toBe 'AA'

  describe '#addr2Nums (addr)', ->
    it 'アドレスを指定するとcol, rowのオブジェクトが返る', ->
      ref = this.sheet.addr2Nums 'A10'
      expect(ref.col).toBe 1
      expect(ref.row).toBe 10
      ref = this.sheet.addr2Nums 'AA10'
      expect(ref.col).toBe 27
      expect(ref.row).toBe 10

  describe '#nums2Addr (col, row)', ->
    it 'col, rowを指定するとアドレスが返る', ->
      expect(this.sheet.nums2Addr 1, 10).toBe 'A10'
      expect(this.sheet.nums2Addr 27, 10).toBe 'AA10'


describe 'Row', ->
  beforeEach ->
    this.xlsx = new EditXlsx 'spec/template.xlsx'
    this.sheet = this.xlsx.sheet 0

  describe '#constructor', ->
    it '要素がない場合は作られ、行番号が若い順に挿入される', ->
      el = this.sheet.doc.get '//def:row[@r > 98]', NS
      expect(el).toBeUndefined()
      new Row this.sheet, 100
      new Row this.sheet, 99
      el = this.sheet.doc.get '//def:row[@r="99"]', NS
      expect(el).toBeDefined()
      expect(el.nextSibling().attr('r').value()).toBe '100'


describe 'SharedStrings', ->
  beforeEach ->
    this.xlsx = new EditXlsx 'spec/template.xlsx'
    this.sheet = this.xlsx.sheet 0
    this.ss = this.sheet.sharedStrings

  describe '#get', ->
    it '正しい値が返る', ->
      expect(this.ss.get 1).toBe 'あいうえお'

    it '値がキャッシュされる', ->
      expect(this.ss.get 4).toBe 'うおおおおぉっ！'
      expect(this.ss.cache[4]).toBe 'うおおおおぉっ！'
      this.ss.cache[4] = 'うおっ'
      expect(this.ss.get 4).toBe 'うおっ'

  describe '@table', ->
    it 'sharedStrings.xmlはキャッシュされる', ->
      expect(this.ss.table).toBe this.ss.table

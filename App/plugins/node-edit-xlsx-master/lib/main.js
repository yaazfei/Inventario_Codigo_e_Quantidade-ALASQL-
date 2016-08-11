'use strict';
var Cell, EditXlsx, Libxmljs, NS, Row, SharedStrings, Sheet, Zip, fs, mkdirp, path, temp, _;

fs = require('fs');

path = require('path');

temp = require('temp').track();

mkdirp = require('mkdirp');

Zip = require('node-zip');

Libxmljs = require('libxmljs');

_ = require('underscore');

NS = {
  def: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
};

Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

EditXlsx = (function() {
  EditXlsx.defaults = {
    preserveCurrentValue: false,
    overwrite: true
  };

  function EditXlsx(xlsxPath) {
    var data, filepath, obj, opts, zip, _ref;
    this.cwd = process.cwd();
    this.tempDir = temp.mkdirSync();
    this.sharedStrings = new SharedStrings(this.tempDir);
    this.sheets = [];
    this.files = [];
    opts = {
      encoding: 'binary'
    };
    data = fs.readFileSync(xlsxPath, opts);
    zip = new Zip(data, {
      base64: false,
      checkCRC32: true
    });
    process.chdir(this.tempDir);
    _ref = zip.files;
    for (filepath in _ref) {
      obj = _ref[filepath];
      if (obj.options.dir) {
        mkdirp.sync(obj.name);
        continue;
      }
      this.files.push(obj.name);
      fs.writeFileSync(obj.name, obj.asBinary(), opts);
    }
    process.chdir(this.cwd);
  }

  EditXlsx.prototype.sheet = function(sheetNum) {
    var _base;
    this.curSheetNum = sheetNum;
    return (_base = this.sheets)[sheetNum] || (_base[sheetNum] = new Sheet(this, sheetNum + 1));
  };

  EditXlsx.prototype.save = function(xlsxPath, opts) {
    var buffer, data, i, options, sheet, zip, _i, _j, _len, _ref, _ref1;
    opts = _.extend({}, EditXlsx.defaults, opts);
    if (fs.existsSync(xlsxPath) && !opts.overwrite) {
      return false;
    }
    _ref = this.sheets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      sheet = _ref[_i];
      sheet.save(opts);
    }
    options = {
      encoding: 'utf8'
    };
    zip = new Zip();
    process.chdir(this.tempDir);
    this.files.forEach(function(path) {
      return zip.file(path, fs.readFileSync(path, options));
    });
    process.chdir(this.cwd);
    data = zip.generate({
      type: 'arraybuffer'
    });
    buffer = new Buffer(data.byteLength);
    for (i = _j = 0, _ref1 = buffer.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      buffer[i] = data[i];
    }
    fs.writeFileSync(xlsxPath, buffer, options);
    return true;
  };

  return EditXlsx;

})();

Sheet = (function() {
  function Sheet(xlsx, num) {
    this.sharedStrings = xlsx.sharedStrings;
    this.path = path.join(xlsx.tempDir, "xl/worksheets/sheet" + num + ".xml");
    this.doc = Libxmljs.parseXml(fs.readFileSync(this.path));
    this.ns = this.doc.root().namespace();
    this.sheetData = this.doc.get('def:sheetData', NS);
    this.rows = [];
    this.cells = {};
  }

  Sheet.prototype.create = function(name, content) {
    var el;
    if (content == null) {
      content = '';
    }
    el = new Libxmljs.Element(this.doc, name, content + '');
    el.namespace(this.ns);
    return el;
  };

  Sheet.prototype.c = function(addr) {
    var ref, _base, _name;
    ref = this.parseAddr(addr);
    return (_base = this.cells)[_name = ref.addr] || (_base[_name] = new Cell(this, ref));
  };

  Sheet.prototype.value = function() {
    var res;
    res = Array.prototype.slice.call(arguments).map((function(_this) {
      return function(arg) {
        return _this.c(arg).value;
      };
    })(this));
    if (arguments.length === 1) {
      return res[0];
    } else {
      return res;
    }
  };

  Sheet.prototype.update = function(addr, value) {
    var row, rowNum, _base;
    rowNum = this.parseAddr(addr).row;
    row = (_base = this.rows)[rowNum] != null ? _base[rowNum] : _base[rowNum] = new Row(this, rowNum);
    this.c(addr).value = value;
    return this;
  };

  Sheet.prototype.save = function(opts) {
    var e, xml;
    if (opts == null) {
      opts = {};
    }
    try {
      xml = this.doc.toString(false).replace(/(<pageSetup .*?) r:id=".*?"(.*?>)/g, function(str, p1, p2) {
        return p1 + p2;
      });
      if (opts.preserveCurrentValue == null) {
        xml = xml.replace(/(<f>.*?<\/f>|<f\/>)(<v>.*?<\/v>|<v\/>)/g, function(str, p1, p2) {
          return p1;
        });
      }
      fs.writeFileSync(this.path, xml);
      return true;
    } catch (_error) {
      e = _error;
      return false;
    }
  };

  Sheet.prototype.parseAddr = function(addr) {
    var col, row, _ref;
    if (_.isString(addr)) {
      _ref = this.addr2Nums(addr), col = _ref.col, row = _ref.row;
      addr = addr;
    } else {
      col = addr[0], row = addr[1];
      addr = this.nums2Addr.apply(this, addr);
    }
    return {
      col: col,
      row: row,
      addr: addr
    };
  };

  Sheet.prototype.alphabet2Num = function(alphabets) {
    var c, digit, i, res, _i, _ref;
    res = digit = 0;
    for (i = _i = _ref = alphabets.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
      c = alphabets.charCodeAt(i) - 64;
      res += digit === 0 ? c : c * Math.pow(26, digit);
      digit++;
    }
    return res;
  };

  Sheet.prototype.num2Alphabet = function(num) {
    var res;
    res = '';
    while (num--) {
      res = String.fromCharCode(65 + (num % 26)) + res;
      num = Math.floor(num / 26);
    }
    return res;
  };

  Sheet.prototype.addr2Nums = function(addr) {
    var matches;
    matches = addr.match(/^([A-Z]+)(\d+)$/);
    return {
      col: this.alphabet2Num(matches[1]),
      row: +matches[2]
    };
  };

  Sheet.prototype.nums2Addr = function(col, row) {
    return this.num2Alphabet(col) + row;
  };

  return Sheet;

})();

Row = (function() {
  function Row(sheet, r) {
    var dest, doc, _ref;
    this.sheet = sheet;
    doc = this.sheet.doc;
    this.xml = doc.get("//def:row[@r=\"" + r + "\"]", NS);
    if (!this.xml) {
      this.xml = this.sheet.create('row');
      this.xml.attr({
        r: r
      });
      dest = doc.get("//def:row[@r > " + r + "]", NS);
            if ((_ref = dest != null ? dest.addPrevSibling(this.xml) : void 0) != null) {
        _ref;
      } else {
        this.sheet.sheetData.addChild(this.xml);
      };
    }
  }

  return Row;

})();

Cell = (function() {
  function Cell(sheet, ref) {
    this.sheet = sheet;
    this.ref = ref;
    this.xml = this.sheet.doc.get("//def:c[@r=\"" + this.ref.addr + "\"]", NS);
  }

  Cell.property('value', {
    get: function() {
      var v, _ref;
      if (this._value === void 0) {
        if (this.xml) {
          v = (_ref = this.xml.get('def:v', NS)) != null ? _ref.text() : void 0;
          return this._value = (function() {
            var _ref1, _ref2;
            switch ((_ref1 = (_ref2 = this.xml.attr('t')) != null ? _ref2.value() : void 0) != null ? _ref1 : 'n') {
              case 'inlineStr':
                return this.xml.get('def:is', NS).childNodes().map(function(el) {
                  switch (el.name()) {
                    case 't':
                      return el.text();
                    case 'r':
                      return el.get('def:t', NS).text();
                  }
                }).join('');
              case 's':
                return this.sheet.sharedStrings.get(+v);
              case 'b':
                return !!+v;
              case 'e':
              case 'str':
                return v;
              default:
                return +v;
            }
          }).call(this);
        } else {
          return this._value = null;
        }
      } else {
        return this._value;
      }
    },
    set: function(value) {
      var dest, el, row, s, _i, _len, _ref, _ref1, _ref2;
      row = this.sheet.rows[this.ref.row].xml;
      if (!this.xml) {
        this.xml = this.sheet.create('c');
        this.xml.attr({
          r: this.ref.addr
        });
        dest = null;
        _ref = row.childNodes();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          if (this.ref.col < (this.sheet.parseAddr(el.attr('r'))).col) {
            dest = el;
            break;
          }
        }
                if ((_ref1 = dest != null ? dest.addPrevSibling(this.xml) : void 0) != null) {
          _ref1;
        } else {
          row.addChild(this.xml);
        };
      }
      this.empty();
      s = row.attr('s');
      if (s && !this.xml.attr('s')) {
        this.xml.attr({
          s: s.value()
        });
      }
      switch (false) {
        case !_.isBoolean(value):
          this.xml.attr({
            t: 'b'
          });
          this.xml.addChild(this.sheet.create('f', ('' + value).toUpperCase()));
          this.xml.addChild(this.sheet.create('v', +value));
          break;
        case !_.isNumber(value):
          if ((_ref2 = this.xml.attr('t')) != null) {
            _ref2.remove();
          }
          this.xml.addChild(this.sheet.create('v', value));
          break;
        default:
          this.xml.attr({
            t: 'inlineStr'
          });
          el = this.sheet.create('is');
          this.xml.addChild(el.addChild(this.sheet.create('t', value)));
      }
      this._value = value;
      return this;
    }
  });

  Cell.prototype.empty = function() {
    return this.xml.childNodes().forEach(function(el) {
      return el.remove();
    });
  };

  return Cell;

})();

SharedStrings = (function() {
  function SharedStrings(tempDir) {
    this.path = path.join(tempDir, 'xl/sharedStrings.xml');
    this.cache = [];
  }

  SharedStrings.prototype.get = function(idx) {
    var _base;
    return (_base = this.cache)[idx] != null ? _base[idx] : _base[idx] = this.table.get("//def:si[" + (idx + 1) + "]", NS).childNodes().map(function(el) {
      switch (el.name()) {
        case 't':
          return el.text();
        case 'r':
          return el.get('def:t', NS).text();
      }
    }).join('');
  };

  SharedStrings.property('table', {
    get: function() {
      return this._table != null ? this._table : this._table = Libxmljs.parseXml(fs.readFileSync(this.path));
    }
  });

  return SharedStrings;

})();

module.exports = EditXlsx;

//# sourceMappingURL=main.js.map

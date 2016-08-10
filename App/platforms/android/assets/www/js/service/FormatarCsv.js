angular.module("starter").service('FormatarCsv', function() {

  // FORMATAR PARA CSV = Baseado em https://jsfiddle.net/dhou6y3o/

  this.iterateObject = function(obj, params) {

    var value = '',
      valueTotal = '',
      header = '',
      // headerNOK = '',
      blankValue = '';

    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        if (isObject(obj[name])) {
          var out = this.iterateObject(obj[name]);
          value += out.value;
          header += out.header;
          // blankValue += ' ';


        } else {
          value += removeNewLine(obj[name]) + '; ';
          blankValue += ' ;';
          header += name + '; ';
          //headerNOK += name + ' NOK' + '; ';
        }

      }
      valueTotal += value + "\n";
    }

    // //Apagar a última vírgula
    // value = value.substring(0, value.length - 2);
    // header = header.substring(0, header.length - 2);
    // headerNOK = headerNOK.substring(0, headerNOK.length - 2);
    // if (params == '0') {
    //   value = value.substring(0, value.length - 2);
    // }

    return {
      //"value": value,
      "valueTotal": valueTotal,
      "header": header,
      //"headerNOK": headerNOK,
      "blankValue": blankValue
    };
  } // Esta linha não está errada. =T  (Se colocar ; aqui o código roda duas vezes)

  function isObject(obj) {
    return (typeof obj === 'object');
  }

  function removeNewLine(item) {
    return item.toString().replace(/(\r\n|\n|\r)/gm, "");
  }

}

);

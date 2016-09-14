angular.module("starter").service('FormatarCsv', function($cordovaFile, $cordovaFileOpener2, $ionicPlatform) {


  ///////////>>>>  CSV PARA JSON


  // function csvTojs(csv) {
  this.csvTojs = function(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(";");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};

      var row = lines[i],
        queryIdx = 0,
        startValueIdx = 0,
        idx = 0;

      if (row.trim() === '') {
        continue;
      }

      //while (idx < row.length) {  //ADICIONAVA UM CAMPO EXTRA EM BRANCO (POR ISSO FOI COLOCADO UM -1 NO ROW.LENGTH)
      while (idx < (row.length - 1)) {
        /* if we meet a double quote we skip until the next one */
        var c = row[idx];

        if (c === '"') {
          do {
            c = row[++idx];
          } while (c !== '"' && idx < row.length - 1);
        }

        if (c === ';' || /* handle end of line with no comma */ idx === row.length - 1) {
          /* we've got a value */
          var value = row.substr(startValueIdx, idx - startValueIdx).trim();



          /* skip first double quote */
          if (value[0] === '"') {
            value = value.substr(1);
          }
          /* skip last comma */
          if (value[value.length - 1] === ';') {
            value = value.substr(0, value.length - 1);
          }
          /* skip last double quote */
          if (value[value.length - 1] === '"') {
            value = value.substr(0, value.length - 1);
          }

          var key = headers[queryIdx++];
          obj[key] = value;
          startValueIdx = idx + 1;
        }

        ++idx;
      }

      result.push(obj);
    }
    return result;
  };

  /*/ *********************************************************************** /*/




  ///////////>>>>  JSON PARA CSV

  this.JSONToCSVConvertor = function(JSONData, ShowLabel) {

    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    //var header = '';

    // //Set Report title in first row or line
    // CSV += ReportTitle + '\r\n\n';


    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {

        //Now convert each value to string and comma-seprated
        row += index + ';';
      }

      row = row.slice(0, -1); //Tira o último ; do header

      //append Label row with line break
      // CSV += row + '\r\n';
      CSV += row + "\r\n";
    }



    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '";';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
    }


    if (CSV === '') {
      alert("Invalid data");
      return;
    }
    return CSV;
    // return{
    //  "CSV": CSV
    //"header": header
    // };
  };


  ///////****************************************************************************************************//




  ///////////>>>>  oBJECT PARA STRING, REMOVER LINE BREAK E STRING PAR OBJECT

  this.toString = function(res1) {
    obj = JSON.stringify(res1);
    obj2 = obj.replace(/(\r\n|\n\r|\r|\n|\\\\n|\\\\r|\\\\r\\\\n|\\r|\\n|\\r\\n|\\\r|\\\n|\\\r\\\n)/g, ""); //WOOOW!
    var newborn = JSON.parse(obj2);

    return newborn; //NEW

  };


  ///////****************************************************************************************************//

});

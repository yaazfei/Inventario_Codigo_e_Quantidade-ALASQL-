angular.module("starter").service('FormatarCsv', function($cordovaFile, $cordovaFileOpener2, $ionicPlatform) {


//// OpenFile

// this.openXLSX = function() {
//     $cordovaFileOpener2.open(
//         '/sdcard/emulated/0/Queiroz Galvão', // Any system location, you CAN'T use your appliaction assets folder
//         'application/xlsx'
//     ).then(function() {
//         console.log('Success');
//     }, function(err) {
//         console.log('An error occurred: ' + JSON.stringify(err));
//     });
// };
//
//     $scope.openPDF= function() {
//         $cordovaFileOpener2.open(
//             '/sdcard/Download/109.pdf',
//             'application/pdf'
//         ).then(function() {
//             console.log('Success');
//         }, function(err) {
//         console.log('An error occurred: ' + JSON.stringify(err));
//         });
//     };
// });

//edit?
// cordova.plugins.fileOpener2.open(
//     '.......', // File location
//     'application/docx',
//     {
//         error : function(e) {
//             console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
//         },
//         success : function () {
//             console.log('file opened successfully');
//         }
//     }
// );





this.CSVToArray = function (strData, strDelimiter){
//function CSVToArray(strData, strDelimiter) {

    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ";");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
};



this.CSV2JSON = function(csv){
//function CSV2JSON(csv) {
    var array = this.CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k];
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    //return str;
    return objArray;
};







// function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
this.JSONToCSVConvertor = function(JSONData, ShowLabel) {

    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';

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

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
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
        CSV += row + '\r\n';
    }


    if (CSV === '') {
        alert("Invalid data");
        return;
    }
return CSV;

};























///////****************************************************************************************************//


  // FORMATAR PARA CSV = Baseado em https://jsfiddle.net/dhou6y3o/
//
//   this.iterateObject = function(obj, params) {
//
//     var value = '',
//       valueTotal = '',
//       header = '',
//       // headerNOK = '',
//       blankValue = '';
//
//     for (var name in obj) {
//       if (obj.hasOwnProperty(name)) {
//         if (isObject(obj[name])) {
//           var out = this.iterateObject(obj[name]);
//           value += out.value;
//           header += out.header;
//           // blankValue += ' ';
//
//
//         } else {
//           value += removeNewLine(obj[name]) + '; ';
//           blankValue += ' ;';
//           header += name + '; ';
//           //headerNOK += name + ' NOK' + '; ';
//         }
//
//       }
//       valueTotal += value + "\n";
//     }
//
//     // //Apagar a última vírgula
//     // value = value.substring(0, value.length - 2);
//     // header = header.substring(0, header.length - 2);
//     // headerNOK = headerNOK.substring(0, headerNOK.length - 2);
//     // if (params == '0') {
//     //   value = value.substring(0, value.length - 2);
//     // }
//
//     return {
//       //"value": value,
//       "valueTotal": valueTotal,
//       "header": header,
//       //"headerNOK": headerNOK,
//       "blankValue": blankValue
//     };
//   } // Esta linha não está errada. =T  (Se colocar ; aqui o código roda duas vezes)
//
//   function isObject(obj) {
//     return (typeof obj === 'object');
//   }
//
//   function removeNewLine(item) {
//     return item.toString().replace(/(\r\n|\n|\r)/gm, "");
//   }
//
}

);

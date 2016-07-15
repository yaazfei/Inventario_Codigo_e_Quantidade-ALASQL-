angular.module('starter').controller('listaLocaisCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, FormatarCsv, PopUps, CriarDiretorio) {


// // Links úteis
//https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
// http://angular-ui.github.io/ui-grid/
// http://plnkr.co/edit/50vJrs?p=preview
// http://www.igniteui.com/javascript-excel-library/excel-import-data
// http://jsfiddle.net/gh/get/jquery/1.9.1/igniteuisamples/jsfiddle-samples/tree/master/EN/HtmlSamples/javascript-excel-library/excel-import-data/
// http://brianhann.com/easily-import-spreadsheets-into-ui-grid/
// https://github.com/aaronksaunders/hu1/wiki/2.1-Using-ng-repeat-in-Ionic-ListView
// https://github.com/SheetJS/js-xlsx
// https://github.com/brexis/angular-js-xlsx
// http://codetheory.in/parse-read-excel-files-xls-xlsx-javascript/



// USANDO UI-GRID
// http://ui-grid.info/docs/#/tutorial/101_intro


// $scope.myData = [
//     {
//         "firstName": "Cox",
//         "lastName": "Carney",
//         "company": "Enormo",
//         "employed": true
//     },
//     {
//         "firstName": "Lorraine",
//         "lastName": "Wise",
//         "company": "Comveyer",
//         "employed": false
//     },
//     {
//         "firstName": "Nancy",
//         "lastName": "Waters",
//         "company": "Fuelton",
//         "employed": false
//     }
// ];



// function loadJSON(callback) {
//
//     var xobj = new XMLHttpRequest();
//         xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'js/locais.json', true); // Replace 'locais' with the path to your file
//     xobj.onreadystatechange = function () {
//           if (xobj.readyState == 4 && xobj.status == "200") {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             callback(xobj.responseText);
//           }
//     };
//     xobj.send(null);
//  }
//
//
// function init() {
//  loadJSON(function(response) {
//   // Parse JSON string into object
//     var actual_JSON = JSON.parse (response);
//     $scope.myData = actual_JSON;
//  });
// }
//
// init();








// Fazendo este aqui >>>>>>>>>>>>>>>>>  http://ui-grid.info/docs/#/tutorial/201_editable



































});

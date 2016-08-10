// angular.module('starter').controller('listaLocaisCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, FormatarCsv, PopUps, CriarDiretorio) {
//

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


//**********************************************************************************************************//

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


//**********************************************************************************************************//


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




//**********************************************************************************************************//



//// Fazendo este aqui >>>>>>>>>>>>>>>>>  http://ui-grid.info/docs/#/tutorial/201_editable



// var myString = '{"COD_BEM":0000000001,"DESC_BEM":"SISTEMA OPERACIONAL WINDOWS XP PRO SP3 C","CHAPA":0000000001C,"COD_LOCAL":000053},{"COD_BEM":0000000001,"DESC_BEM":"SOFTWARE CYBERLINK POWER DVD 8.3 SEM MID","CHAPA":0000000001B,"COD_LOCAL":000053}';
// console.log(JSON.parse(myString));
//
//
// $scope.gridOptions = {  };
//
// $scope.storeFile = function( gridRow, gridCol, files ) {
//   // ignore all but the first file, it can only select one anyway
//   // set the filename into this column
//   gridRow.entity.filename = files[0].name;
//
//   // read the file and set it into a hidden column, which we may do stuff with later
//   var setFile = function(fileContent){
//     gridRow.entity.file = fileContent.currentTarget.result;
//     // put it on scope so we can display it - you'd probably do something else with it
//     $scope.lastFile = fileContent.currentTarget.result;
//     $scope.$apply();
//   };
//   var reader = new FileReader();
//   reader.onload = setFile;
//   reader.readAsText( files[0] );
// };
//
// $scope.gridOptions.columnDefs = [
//   { name: 'COD_BEM', enableCellEdit: false, displayName: 'CÓDIGO', width: '15%' },
//   { name: 'DESC_BEM', displayName: 'DESCRIÇÃO (editable)', width: '30%' },
//   { name: 'CHAPA', enableCellEdit: false, width: '15%' },
//   { name: 'COD_LOCAL', displayName: 'CÓDIGO LOCAL (editable)', width: '20%' }
// ];
//
//
//
//
//
//
//   // ///////////////// MDS, OLHA QUANTA COISA
//
//   // { name: 'age', displayName: 'Age' , type: 'number', width: '10%' },
//   // { name: 'gender', displayName: 'Gender', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
//   //   cellFilter: 'mapGender', editDropdownValueLabel: 'gender', editDropdownOptionsArray: [
//   //   { id: 1, gender: 'male' },
//   //   { id: 2, gender: 'female' }
//   // ] },
//   // { name: 'registered', displayName: 'Registered' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"', width: '20%' },
//   // { name: 'address', displayName: 'Address', type: 'object', cellFilter: 'address', width: '30%' },
//   // { name: 'address.city', displayName: 'Address (even rows editable)', width: '20%',
//   //      cellEditableCondition: function($scope){
//   //      return $scope.rowRenderIndex%2;
//   //      }
//   // },
//   // { name: 'isActive', displayName: 'Active', type: 'boolean', width: '10%' },
//   // { name: 'pet', displayName: 'Pet', width: '20%', editableCellTemplate: 'ui-grid/dropdownEditor',
//   //   editDropdownRowEntityOptionsArrayPath: 'foo.bar[0].options', editDropdownIdLabel: 'value'
//   // },
//   // { name: 'status', displayName: 'Status', width: '20%', editableCellTemplate: 'ui-grid/dropdownEditor',
//   //   cellFilter: 'mapStatus',
//   //   editDropdownOptionsFunction: function(rowEntity, colDef) {
//   //     var single;
//   //     var married = {id: 3, value: 'Married'};
//   //     if (rowEntity.gender === 1) {
//   //       single = {id: 1, value: 'Bachelor'};
//   //       return [single, married];
//   //     } else {
//   //       single = {id: 2, value: 'Nubile'};
//   //       return $timeout(function() {
//   //         return [single, married];
//   //       }, 100);
//   //     }
//   //   }
//   // },
//   // { name: 'filename', displayName: 'File', width: '20%', editableCellTemplate: 'ui-grid/fileChooserEditor',
//   //   editFileChooserCallback: $scope.storeFile }
//
//
// $scope.msg = {};
//
// $scope.gridOptions.onRegisterApi = function(gridApi){
//         //set gridApi on scope
//         $scope.gridApi = gridApi;
//         gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
//           $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
//           $scope.$apply();
//         });
//       };
//
// $http.get ('js/bens.json')
//   .success(function(data) {
//     //for(i = 0; i < data.length; i++){
//       //data[i].registered = new Date(data[i].registered);
//       //data[i].gender = data[i].gender==='male' ? 1 : 2;
//     //   if (i % 2) {
//     //     data[i].pet = 'fish';
//     //     data[i].foo = {bar: [{baz: 2, options: [{value: 'fish'}, {value: 'hamster'}]}]};
//     //   }
//     //   else {
//     //     data[i].pet = 'dog';
//     //     data[i].foo = {bar: [{baz: 2, options: [{value: 'dog'}, {value: 'cat'}]}]};
//     //   }
//     //}
//
//     $scope.gridOptions.data = data;
//   });
//
//
// // .filter('mapGender', function() {
// // var genderHash = {
// //   1: 'male',
// //   2: 'female'
// // };
// //
// // return function(input) {
// //   if (!input){
// //     return '';
// //   } else {
// //     return genderHash[input];
// //   }
// // };
// // })
// //
// // .filter('mapStatus', function() {
// // var genderHash = {
// //   1: 'Bachelor',
// //   2: 'Nubile',
// //   3: 'Married'
// // };
// //
// // return function(input) {
// //   if (!input){
// //     return '';
// //   } else {
// //     return genderHash[input];
// //   }
// // };
//
//
//


//**********************************************************************************************************//


//// usando o  ALASQL
//// https://github.com/agershun/alasql


// var $ = require('jquery');
// console.log('passou do require');

// $scope.locais = [
//   { COD_LOCAL: '123562', DESC_LOCAL: 'DESCRIÇÃO TESTE' },
//   { COD_LOCAL: '458569', DESC_LOCAL: 'DESCRIÇÃO TESTE'},
//   { COD_LOCAL: '23452', DESC_LOCAL:'DESCRIÇÃO TESTE'},
//   { COD_LOCAL: '52345', DESC_LOCAL: 'DESCRIÇÃO TESTE' }
// ];




// // ESSE AQUI FUNCIONA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ELE LISTA O JSON NA TELA (MAS NÃO USA ALASQL)
// $scope.locais= [];
// $http.get('js/locais.json').then(function(response) {
//     $scope.locais =response.data;
//     locais = $scope.locais;
//     console.log($scope.locais);
// });




/////////ESSE AQUI FUNCIONA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ELE LISTA O XLSX NA TELA (USA ALASQL)

// alert('passou do require: ' + alasql);
//
//           alasql('select COD_LOCAL, DESC_LOCAL from xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == "000053"',
//               [],function(data){
//               console.log(data);
//               $scope.locais = data;
//           });
//
//
// $scope.exportData = function () {
//         alasql('SELECT * INTO XLSX("locais.xlsx",{headers:true}) FROM ?',[$scope.locais]);
//     };









//////////////////////////////////////////////////////////**********************************************************************************************************//
//////////////       TESTE DE CONSULTAR PRODUTO SEM LISTA

angular.module('starter').controller('listaLocaisCtrl', function($scope, $state, $cordovaFile, $stateParams, $ionicPopup, $timeout, $http, $ionicScrollDelegate, filterFilter, $location, Scopes, PopUps, CriarDiretorio) {

      console.log('Entrou no controller de Consultar Produto TESTE ---------------------------------------------------------');
      console.log('Códigos de locais válidos: 000053, 000039, 000005');
      console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080');

      $scope.teste = {
        COD_LOCAL: '000053',
        DESC_LOCAL: 'GERENCIAMENTO DE CONTROLER DE HUEHUEBR'
      };


      /*/ Escolher um Bem /*/
      $scope.editarBem = function(bem, dados) {
        // alert('Entrou no editarBem');
        if (bem.COD_LOCAL === dados.COD_LOCAL) {

        } else {



          console.log('Entrou no editarBem, vai fazer o alaSQL');

          ///////////////////// PARA COMPARAR O COD_LOCAL DO BEM COM O COD_LOCAL DO LOCAL
          localCod = bem.COD_LOCAL;
          alasql.promise('SELECT DESC_LOCAL FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?', [localCod])
            .then(function(res) {

              // ACHOU O LOCAL E PEGOU O PRIMEIRO
              console.log('Encontrou o local com o alaSQL');
              console.log('Resultado do ALQSQL: ' + res[0]);
              bem.DESC_LOCAL = res[0].DESC_LOCAL;


              if (window.cordova) { //Só entra por device

                //CriarDiretorio.processar($cordovaFile, dados);
                //alert("Passou do CriarDiretorio.processar");
              }


              Scopes.setBem(bem);
              console.log('Bem: ' + bem);

              $state.go('app.editarProduto');


            }).catch(function(err) { // NÃO ENCONTROU O LOCAL

              PopUps.erroConsultar("Bem não encontrado!");
            });

        }
      };







      //////////****** CONTROLLER DA PÁGINA SEM LISTA (INCOMPLETO)

      $scope.buscaBem = function(bem) {

        // localCod = teste.COD_LOCAL;
        bemCod = bem.COD_BEM;
        alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA == ?', [bemCod])
          .then(function(res) {

            ////// ACHOU O LOCAL E PEGOU O PRIMEIRO
            //alert('Encontrou o Bem com o alaSQL');

            console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].CHAPA + ' ' + res[0].DESC_BEM);
            Scopes.setBem(res[0]);
            $scope.bemEncontrado = res;
            // $scope.bem = res[0];


            $scope.hideBem = false;
            //return $scope.hideBem;



            if (window.cordova) { //Só entra por device

              //CriarDiretorio.processar($cordovaFile, dados);
              //alert("Passou do CriarDiretorio.processar");
            }


            // alert('saiu do alaSQL');

            console.log('Bem foi encontrado.');
            $state.go('app.listaLocais');


          }).catch(function(err) { // NÃO ENCONTROU O LOCAL

            PopUps.erroConsultar("Bem não encontrado!");
          });
      };




      $scope.teste2 = function() { //TESTE PARA CRIAR UM NOVO ARQUIVO COM O OBJETO EDITADO SEM USAR UPDATE, DELETE E INSERT DO ALASQL

        bem = {
          COD_BEM: "000000023",
          DESC_BEM: "Blau blau",
          CHAPA: "000180",
          COD_LOCAL: "000093"
        };


        dados = {
          COD_LOCAL: "000053",
          DESC_LOCAL: "Blau Local"
        };


        alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA !== ?', [bem.CHAPA])
          .then(function(res) {
            // ACHOU
            //console.log('Encontrou com o ALQSQL: ' + res);
            //res = angular.merge({}, bem);
            res.push(bem);

            // if (window.cordova) { //Só entra por device
            //
            //   CriarDiretorio.processar($cordovaFile, res);
            //   //alert("Passou do CriarDiretorio.processar");
            // }

            $scope.teste3(res);





          }).catch(function(err) { // NÃO ENCONTROU O bem

            PopUps.erroConsultar("Bens não encontrados!");
          });

      };









      $scope.teste3 = function(res) { //TESTE PARA CRIAR UM NOVO ARQUIVO COM O OBJETO EDITADO SEM USAR UPDATE, DELETE E INSERT DO ALASQL (BAIXANDO)

          console.log(res);
          var jsonObject = JSON.stringify(res);

          console.log(jsonObject);

          var finalCSV = ConvertToCSV(jsonObject);
          console.log(finalCSV);




          function ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

            for (var i = 0; i < array.length; i++) {
              var line = '';
              for (var index in array[i]) {
                if (line !== '') {
                  line += ',';

                  line += array[i][index];
                }
              }

              str += line + '\r\n';
            }

            return str;
          }

          if (window.cordova) { //Só entra por device

            CriarDiretorio.processar($cordovaFile, finalCSV);
            //alert("Passou do CriarDiretorio.processar");
          }






          // alasql.promise('SELECT * INTO XLSX("Lista_de_Bens.xlsx",{headers:true}) FROM ?',[res])
          // .then(function(res) {
          //     // ACHOU
          //     //console.log('Encontrou com o ALQSQL: ' + res);
          //     //res = angular.merge({}, bem);
          //     // res.push(bem);
          //
          //     // if (window.cordova) { //Só entra por device
          //     //
          //     //   CriarDiretorio.processar($cordovaFile, res);
          //     //   //alert("Passou do CriarDiretorio.processar");
          //     // }
          //
          //   }).catch(function(err) { // NÃO ENCONTROU O bem
          //
          //     PopUps.erroConsultar("Bens não encontrados!");
          //   });
          //


        };









        $scope.teste1 = function() {

          //   var population = 123;
          //   var city = "Blaublau";
          //   alasql('CREATE TABLE IF NOT EXISTS MyAtlas.City (city string, population number)');
          //   alasql('SELECT * INTO MyAtlas.City FROM ?', [
          //       [
          //           { city: 'Vienna', population: 1731000 },
          //           { city: 'Budapest', population: 1728000 }
          //       ]
          //   ]);
          //
          //   var res = alasql('SELECT * FROM MyAtlas.City WHERE city = "' + id + '";');
          //   alasql('UPDATE MyAtlas.City SET population = "' + population + '" WHERE city = "' + id + '";');
          //
          // console.log (MyAtlas.City);

          bem = {
            COD_BEM: "000000023",
            DESC_BEM: "Blau blau",
            CHAPA: "000180",
            COD_LOCAL: "000093"
          };


          dados = {
            COD_LOCAL: "000053",
            DESC_LOCAL: "Blau Local"
          };

          // var data = {
          //   COD_BEM : bem.COD_BEM,
          //   DESC_BEM : bem.DESC_BEM,
          //   CHAPA : bem.CHAPA,
          //   COD_LOCAL : bem.COD_LOCAL};


          // alasql('SELECT * INTO xlsx("js/Lista_de_Bens.xlsx",{headers:true}) FROM ', [bem.CHAPA]);
          // alasql('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA == ?', [bem.CHAPA],function(data){
          //         console.log(data);
          //         alasql('UPDATE TabelaBens SET COD_LOCAL="23" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [bem.CHAPA]);
          //
          //         console.log(data);
          //     });


          // alasql('INSERT INTO $Lista_de_Bens SELECT * INTO xlsx("js/Lista_de_Bens.xlsx",{headers:true})', [bem.CHAPA]);


          //alasql('SELECT * INTO xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA ===', [bem.CHAPA]);



          // alasql('UPDATE XLSX("js/Lista_de_Bens.xlsx",{headers:true}) \ SET COD_LOCAL="666" WHERE CHAPA == ?', [bem.CHAPA]);
          // alasql('UPDATE TabelaBens SET COD_LOCAL="666" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [bem.CHAPA]);


          // alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA == ?', [bem.CHAPA])
          //   .then(function(res) {
          //     // ACHOU
          //     console.log('Encontrou com o ALQSQL: ' + res[0]);
          //     console.log(res);
          //
          //
          //     // alasql('UPDATE XLSX("js/Lista_de_Bens.xlsx") SET COD_LOCAL = ? WHERE CHAPA == ?', [bem.COD_LOCAL, bem.CHAPA]);
          //     alasql('UPDATE [Grid Results] SET COD_LOCAL="666" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [bem.CHAPA]);
          //
          //     // alasql.promise('UPDATE TabelaBens SET COD_LOCAL="666" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [bem.CHAPA])
          //     //   .then(function(res) {
          //     //
          //     //
          //     //     console.log(res);
          //     //   }).catch(function(err) { // NÃO ENCONTROU O bem
          //     //
          //     //     PopUps.erroConsultar("UPDATE falhou!");
          //     //   });
          //     console.log(res);
          //
          //
          //
          //   }).catch(function(err) { // NÃO ENCONTROU O bem
          //
          //     PopUps.erroConsultar("Bem não encontrado!");
          //   });



          // alasql('select * into one from csv("mydata.csv")');
          // alasql('UPDATE XLSX("js/Lista_de_Bens.xlsx") SET COD_LOCAL = ? WHERE CHAPA == ?', [bem.COD_LOCAL, bem.CHAPA]);
          // alasql('UPDATE TabelaBens SET COD_LOCAL="23" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [bem.CHAPA]);
          // alasql('UPDATE ? SET COD_LOCAL="23" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [data, bem.CHAPA]);

          // alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA == ?', [bem.CHAPA])
          //   .then(function(res) {
          //     // ACHOU
          //     console.log('Encontrou com o ALQSQL: ' + res[0]);
          //
          //
          //   }).catch(function(err) { // NÃO ENCONTROU O bem
          //
          //     PopUps.erroConsultar("Bem não encontrado!");
          //   });



        };









        //   /*****************/
        //   ////// Termina o controller ainda dentro do alaSQL (porque ele está async?)
        //
        // }).catch(function(err) { // NÃO ENCONTROU O LOCAL
        //
        //   PopUps.erroConsultar("Bens não encontrados!");
        // });



        /*****************************************************************************/
        //////******************* LISTA PELO ALASQL  (Não está funcionando)

        // function listarBens() {
        //
        //
        //   alasql.promise('SELECT * FROM xlsx("js/Lista de Bens.xlsx",{headers:true}')
        //   .then(function(res) {
        //
        //       // ACHOU
        //       alert('Encontrou com o alaSQL');
        //       //console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
        //
        //       $scope.bens = res.data;
        //       var bens = $scope.bens;
        //       console.log('$scope.bens: ' + $scope.bens);
        //
        //
        //     }).catch(function(err) { // NÃO ENCONTROU O LOCAL
        //
        //       PopUps.erroConsultar("Bens não encontrados!");
        //     });
        //
        // }



        /*****************************************************************************/
        /*/ LISTA EM JSON /*/


        // ///////////////////////////////////// Funcionando, MELHOR MODO?
        // function listarBens() {
        //   var promisse;
        //   $scope.bens = [];
        //   promisse = $http.get('js/bens.json');
        //     promisse.then(function (response){
        //       $scope.bens = response.data;
        //       var bens = $scope.bens;
        //       console.log('$scope.bens: ' + $scope.bens);
        //       //getBens();
        //     });
        //
        // }



        ///////////////////////////////////// Modo antigo. Dá várias voltas
        // $scope.bens = [];
        // $http.get('js/bens.json').then(function(response) {
        //   $scope.bens = response.data;
        //   var bens = $scope.bens;
        //   console.log($scope.bens);
        // });



        ///////////////////////////////////// Funcionando, mas ainda dá voltas
        // function listarLocais() {
        //   $scope.locais = [];
        //   $http.get('js/locais.json').then(function(response) {
        //     $scope.locais = response.data;
        //     var locais = $scope.locais;
        //     console.log('$scope.locais: ' + $scope.locais);
        //   });
        // }
        //
        //
        //
        // function listarLocaisEspera($scope) {
        //   var promise = listarLocais(); //make rest call
        //   $scope.waitMessage = true;
        //   console.log($scope.waitMessage);
        //
        //   $timeout(function() {
        //     //before resolving the promise, wait a certain number of ms, then
        //     //resolve and display data to user
        //     promise.then(function(response) {
        //
        //       $scope.output = response.data;
        //       $scope.waitMessage = false;
        //       console.log($scope.waitMessage);
        //     });
        //   }, 1000);
        // }



        // ******************************************************************************* //



        // ******************************************************************************* //


        console.log("Passou uma vez. Esperando o alaSQL. ");
        // console.log("$scope.locais: " + $scope.locais);
        //console.log(bens);
        //console.log(blau = $scope.getBem());
        // console.log("$scope.bem: " + $scope.bens);
        //console.log(listaBem);









      });









    // });

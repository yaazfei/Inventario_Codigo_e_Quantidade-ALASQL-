angular.module('starter.controllers', []).controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});
//
//   // Form data for the login modal
//   $scope.loginData = {};
//
//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });
//
//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };
//
//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };
//
//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);
//
//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// })
//
//
//
// .controller('Consulta', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes) {
//
//   //
//   //   $scope.filename = "test";
//   //   $scope.getArray = [{a: 1, b:2}, {a:3, b:4}];
//   //
//   // $scope.addRandomRow = function() {
//   //   $scope.getArray.push({a: Math.floor((Math.random()*10)+1), b: Math.floor((Math.random()*10)+1)});
//   // };
//   //
//   // $scope.getHeader = function () {return ["A", "B"]};
//   //
//   // $scope.clickFn = function() {
//   //   console.log("click click click");
//   // };
//
//   $scope.consultarVeiculo = function(dados) {
//     //dados = 'LC000000012157';
//     if (dados == "" || dados == undefined) {
//       $scope.showAlert();
//     } else {
//       var req = {
//         method: 'POST',
//         url: 'http://patiodemo.dsin.com.br/coletorinventario/busca',
//         headers: {
//           'authorization': "Basic " + btoa('dsinColetor:dsinColetor')
//         },
//         params: {
//           lacre: dados.codigo
//         }
//       }
//
//       // LC000000012157
//       $http(req).then(function mySucces(response) {
//         //olhar isso. O response.data retorna mais de um veículo.
//         // response.data =
//
//         //MOCK
//         response.data = [];
//         //  var veiculo = new Object();
//         //  veiculo.PLACA = '123';
//         //  veiculo.MODELO= '123';
//         //    veiculo.COR= '123';
//         //    veiculo.PROCESSO= '123';
//         //    veiculo.CHASSI= '123';
//         //    veiculo.PATIO= '123';
//         //    veiculo.PLACA= '123';
//
//         // var veiculo = {
//         //    PLACA : '123',
//         //    MODELO : '123',
//         //    COR : '123',
//         //    PROCESSO : '123',
//         //    CHASSI : '123',
//         //    PATIO : '123',
//         //    PLACA : '123'
//         //  };
//
//         response.data.push({
//
//           PLACA: '1234567',
//           MODELO: 'ZEPPELIN',
//           COR: 'VERMELHO',
//           PROCESSO: '123456789',
//           CHASSI: '987654321',
//           PATIO: 'ALYSTRAZOR B',
//           LOCALIZACAO: 'RIO DE JANEIRO',
//           ESTADO: 'BOM',
//           DATAENTRADA: '06/06/2016 18:16',
//           STATUSLEILAO: 'EM ESPERA',
//           LEILAO: '876804-2',
//           RESTRICAO: '',
//           DATALIBERACAO: '',
//           DATACOLETA: 'Mon Jun 13 2016 17:31:53 GMT-0300)',
//           USUARIOCOLETA: 'ADMIN',
//           STATUS: '1'
//         });
//
//
//
//         var obj = response.data.pop();
//         if (response.data != null) {
//           for (i = 0; i < response.data.length; i++) {
//             console.log('Objeto retornado pelo serviço: ' + response.data[i]);
//           }
//         }
//
//         // var arr = Object.keys(obj).map(function(k) { return obj[k] });
//         // console.log('Objeto transformado em array: '+arr);
//         // $scope.getArray = [];
//         // $scope.getArray.push({a: Math.floor((Math.random()*10)+1), b: Math.floor((Math.random()*10)+1)});
//
//         //  Scopes.ItemSelecionado = obj;
//         Scopes.setItem(obj);
//         veiculo = obj;
//         console.log('Scopes: ->' + Scopes);
//         console.log('Scope: ' + Scopes.getItem());
//         $state.go('app.infoProduto');
//
//       }, function myError(response) {
//         $scope.mensagem = response.statusText;
//         $scope.erroConsultar(response.statusText)
//
//       });
//       dados.codigo = "";
//     }
//
//   }
//
//   $scope.showAlert = function() {
//     var alertPopup = $ionicPopup.alert({
//       title: 'Código em branco',
//       template: 'Insira o código'
//     });
//   };
//
//
//   $scope.erroConsultar = function(erro) {
//     var alertPopup = $ionicPopup.alert({
//       title: 'Erro ao consultar',
//       template: erro
//     });
//   };
//
//
//
// })
//
// //
// // .controller('geradorCsvCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes) {
// //
// //   $scope.veiculo = Scopes.ItemSelecionado;
// //
// //   console.log('geradorCsvCtrl Scopes: ' + Scopes);
// //   $scope.filename = "test.csv";
// //   veiculo = $scope.veiculo;
// //
// //   console.log('veiculo :' + Scopes.ItemSelecionado);
// //
// //   //Para iniciar o Array
// //   $scope.getArray = [];
// //
// //   $scope.getArray.push(veiculo.PLACA,
// //     veiculo.MODELO,
// //     veiculo.COR,
// //     veiculo.PROCESSO,
// //     veiculo.CHASSI,
// //     veiculo.PATIO,
// //     veiculo.LOCALIZACAO,
// //     veiculo.ESTADO);
// //   console.log('array: ' + $scope.getArray);
// //
// //   $scope.getHeader = function() {
// //     return ["Placa", "Marca/Modelo", "Cor", "Processo", "Chassi", "Pátio", "Localização", "Estado"]
// //   };
// //
// // })
//
//
//
//
//
//
//
//
//
// /*/*********************************************************************************************/
// /*/ Ideias para controllers  /*/
//
//
//
// /*/ Especificações do Projeto: https://drive.google.com/file/d/0B2HB7OGii5BoUEpGaDgyOHo2c3M/view?usp=sharing /*/
//
//
// //Deve criar a pasta L2R se ela não existir.
// //Deve gerar, dentro da pasta e se ele já não existir, o arquivo veiculos.csv com cabeçalho (assim que mostra a consulta de veículo )
//
// //Itens do Cabeçalho:
// /*/
// Lacre, Situacao (1 ou 0 de acordo com a indicação do usuário durante a coleta), Processo, Chassi, Marca/Modelo,
// Cor, Data Entrada, Patio, Status Leilao, Leilao, Restricao, Data Liberacao, Localizacao, Estado Veiculo,
// Placa NOK, Marca/Modelo NOK, Cor NOK, Processo NOK, Chassi NOK, Localizacao NOK, Estado Veiculo NOK
// (NOK para os recém-cadastrados ou para os campos diferentes que serão modificados)
// /*/
//
// //Deve escrever uma linha no arquivo veiculos.csv (já existente) dentro da pasta L2R
// //Não deve haver cabeçalho pois ele já estará no arquivo.
// //O botão Veículo OK mudará a SITUAÇÃO para 1 e o Não OK mudará para 0
// //Campos diferentes devem ser gravados nos campos NOK.
// //Se veículo não existir, deve ser preenchida sua ficha e ela será salva somente nos campos NOK.
//
//
//
//
//
//
//
// //Gerar arquivo:
//
// //  // Baseado em http://stackoverflow.com/questions/23667074/javascriptwrite-a-string-with-multiple-lines-to-a-csv-file-for-downloading
//
// // getReport = function(){
// //       var report = "a,b,c,d;1,2,3,4;";
// //       //console.log(report);
// //       var csvcontent="";
// //       while (report.indexOf(";")!=-1)
// //       {
// //           csvcontent=csvcontent+ report.substring(0,report.indexOf(";"))+"\n";
// //           report=report.substring(report.indexOf(";")+1);
// //       }
// //
// //       console.log(csvcontent);
// //       var a = document.createElement('a');
// //       a.href = 'data:text/csv;charset=utf-8;base64,' + window.btoa(csvcontent);
// //       a.target   = '_blank';
// //       a.download = 'myFile.csv';
// //       document.body.appendChild(a);
// //       //console.log("ok");
// //       a.click();
// //   }
// //
// //
// // //ou
// // // Baseado em https://www.raymondcamden.com/2014/11/05/Cordova-Example-Writing-to-a-file/
// //
// // writeLog = function (str) {
// //     if(!logOb) return;
// //     var log = str + " [" + (new Date()) + "]\n";
// //     console.log("going to log "+log);
// //     logOb.createWriter(function(fileWriter) {
// //
// //         fileWriter.seek(fileWriter.length);
// //
// //       //  var blob = new Blob([log], {type:'text/plain'});
// //         fileWriter.write(blob);
// //         console.log("ok, in theory i worked");
// //     }, fail);
// // }
// //
// //
// //
//
//
//
// /*/*********************************************************************************************/
//
// //
// // .controller('VeiculoController', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes) {
// //
// //
// //   //POP UP DE TESTE2
// //   $scope.testeSubstituicao = function(veiculoNOK) {
// //     var alertPopup = $ionicPopup.alert({
// //       title: 'Teste Subs',
// //       template: 'Resultado:\n' + veiculoNOK.marca
// //     })
// //   };
// //
// //
// //
// //   $scope.veiculo = Scopes.getItem();
// //   //$scope.veiculo = Scopes.ItemSelecionado;
// //
// //   console.log('veiculo ' + $scope.veiculo);
// //   veiculo = $scope.veiculo;
// //
// //
// //   $scope.GravarProdutoInvalido = function() {
// //     console.log('Chegou no Gravar produto inválido ' + $scope.veiculo);
// //     // $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory+"L2R", "veiculos.txt", $scope.veiculo.PLACA + "+0;")
// //     // .then(function (success) {
// //     //   $timeout(function() {
// //     //     $scope.carroSalvo();
// //     //     $state.go('app.localizacao');
// //     //   }, 1000);
// //     // }, function (error) {
// //     //   $scope.erroEscrever();
// //     // });
// //
// //   }
// //
// //   function check(nome, valorAntigo) {
// //     if (document.forms["editarVeiculoForm"][nome].value == "")
// //       document.forms["editarVeiculoForm"][nome].value = valorAntigo;
// //   }
// //
//
//
//
//
//
//
//
//
// // })
//
// /*************************************************/
//
//
//
// .controller('Grava', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes) {
//
//   console.log('$scope ' + $scope);
//   $scope.veiculo = Scopes.getItem();
//
//   console.log('Scopes: ' + Scopes);
//   //$scope.veiculo = Scopes.getItem();
//   console.log('veiculo: ' + $scope.veiculo);
//
//
//
//   // POPUPS
//   $scope.carroSalvo = function() {
//     var alertPopup = $ionicPopup.alert({
//       title: 'Salvo',
//       template: 'Veículo salvo com sucesso'
//     });
//
//   };
//   $scope.erroEscrever = function() {
//     var alertPopup = $ionicPopup.alert({
//       title: 'Erro',
//       template: 'Não foi possivel salvar o veículo'
//     });
//   };
//   $scope.erroCriarPasta = function() {
//     var alertPopup = $ionicPopup.alert({
//       title: 'Erro',
//       template: 'Não foi possivel criar pasta L2R'
//     });
//   };
//
//   //POP UP DE TESTE
//   $scope.testeJson = function(results) {
//     var alertPopup = $ionicPopup.alert({
//       title: 'Teste Json',
//       template: 'Resultado:\n' + results.header+ '\n' + results.value
//     });
//   };
//
//   $scope.escreverCarroValido = function() {
//
//     veiculo.STATUS = '1';
//
//     console.log('veiculo: ' + $scope.veiculo);
//     console.log('item: ' + Scopes.getItem());
//     veiculo = Scopes.getItem();
//
//
//     //$scope.escreverArquivoCSV(veiculo);
//     //$cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.txt", $scope.veiculo.PLACA + "+1;")
//     if ($cordovaFile != undefined && $cordovaFile != null) {
//
//       var results = iterateObject(veiculo, 0);
//       $scope.testeJson(results);
//
//
//       $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.value + '\n'))
//         .then(function(success) {
//           $timeout(function() {
//             $scope.carroSalvo();
//             //$state.go('app.localizacao');
//           }, 1000);
//
//           //$scope.escreverArquivoCSV(veiculo);
//         }, function(error) {
//           $scope.erroEscrever();
//         });
//     }
//     console.log('Arquivo criado');
//   }
//
//   $scope.escreverArquivoCSV = function(veiculo) {
//     console.log('escreve arquivo csv');
//     console.log('Veiculo:' + veiculo);
//
//
//
//
//   }
//
//
//
//
//
//
//
//
//
//   /*//////////////////***********************************************************/
//   /*/ CRIAR NOVO PRODUTO /*/
//
//
//   $scope.escreverNovoProduto = function(veiculoNOK) {
//
//     console.log('Entrou no escrever novo veículo');
//
//     $scope.veiculo = {
//       PLACA: '',
//       MODELO: '',
//       COR: '',
//       PROCESSO: '',
//       CHASSI: '',
//       PATIO: '',
//       LOCALIZACAO: '',
//       ESTADO: '',
//       DATAENTRADA: '',
//       STATUSLEILAO: '',
//       LEILAO: '',
//       RESTRICAO: '',
//       DATALIBERACAO: '',
//       DATACOLETA: '',
//       USUARIOCOLETA: '',
//       STATUS: ''
//     }
//
//     //$scope.veiculo.STATUS = '2';
//
//     veiculoNOK.DATACOLETA = new Date(); //Date.now(),
//     veiculoNOK.USUARIOCOLETA = 'Admin';
//     veiculoNOK.STATUS = '2';
//
//     console.log('Data: ' + veiculoNOK.DATACOLETA);
//
//     Scopes.setItem($scope.veiculoNOK);
//     veiculoNOK = Scopes.getItem();
//
//     Scopes.setItem($scope.veiculo);
//     veiculo = Scopes.getItem();
//
//     if ($cordovaFile != undefined && $cordovaFile != null) {
//
//       var results = iterateObject(veiculo, 2);
//       var resultsNOK = iterateObject(veiculoNOK, 2);
//       $scope.testeJson(resultsNOK);
//
//       $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (resultsNOK.value + results.value + '\n'))
//         .then(function(success) {
//           $timeout(function() {
//             $scope.carroSalvo();
//
//             //$state.go('app.localizacao');
//           }, 1000);
//         }, function(error) {
//           $scope.erroEscrever();
//         });
//     }
//   }
//
//
//   /*/ EDITANDO UM PRODUTO (VEICULO NÃO OK) /*/
//
//
//   $scope.escreverProdutoInvalido = function(veiculo, veiculoNOK) {
//
//     console.log('Entrou no escrever veiculo inválido');
//
//     //veiculo.STATUS = '0';
//
//     veiculoNOK.DATACOLETA = new Date(); //Date.now(),
//     veiculoNOK.USUARIOCOLETA = 'Admin';
//     veiculoNOK.STATUS = '0';
//
//     console.log('Data: ' + veiculoNOK.DATACOLETA);
//
//     Scopes.setItem($scope.veiculoNOK);
//     veiculoNOK = Scopes.getItem();
//
//     Scopes.setItem($scope.veiculo);
//     veiculo = Scopes.getItem();
//
//
//     if ($cordovaFile != undefined && $cordovaFile != null) {
//
//       var resultsNOK = iterateObject(veiculoNOK, 0);
//       var results = iterateObject(veiculo, 0);
//       $scope.testeJson(results, resultsNOK);
//
//
//
//       $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (resultsNOK.value + results.value + '\n'))
//         .then(function(success) {
//           $timeout(function() {
//             $scope.carroSalvo();
//
//             //$state.go('app.localizacao');
//           }, 1000);
//         }, function(error) {
//           $scope.erroEscrever();
//         });
//     }
//   }
//
//
//
//
//   /*//////////////////***********************************************************/
//
//
//
//
//   //
//   // $scope.escreverCarroInvalido = function() {
//   //   $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.value + ", 0" + '\n'))
//   //     .then(function(success) {
//   //       $timeout(function() {
//   //         $scope.carroSalvo();
//   //         $state.go('app.localizacao');
//   //       }, 1000);
//   //     }, function(error) {
//   //       $scope.erroEscrever();
//   //     });
//   // }
//   //
//
//
//
//
//
//   // Comentado para testar no Browser
//
//   // $scope.criarArquivo = function($cordovaFile) {
//   //   $cordovaFile.createFile(cordova.file.externalRootDirectory + "L2R", "veiculos.txt", true)
//   //     .then(function(success) {
//   //
//   //     }, function(error) {
//   //       alert("Erro ao criar aquivo");
//   //       // error
//   //     });
//   // }
//   //
//   //
//   // criarPasta = function($cordovaFile) {
//   //   // if($cordovaFile != null){
//   //   console.log('criar pasta');
//   //   if ($cordovaFile != undefined && $cordovaFile != null) {
//   //     $cordovaFile.createDir(cordova.file.externalRootDirectory, "L2R", true)
//   //       .then(function(success) {
//   //         $scope.criarArquivo($cordovaFile);
//   //
//   //       }, function(error) {
//   //         $scope.erroCriarPasta();
//   //       });
//   //   }
//   //   // }
//   //   console.log('pasta criada');
//   // }
//   //
//   // criarPasta($cordovaFile);
//   // console.log('fim Grava');
//   // console.log('veiculo ' + $scope.veiculo);
//   //
//
//
//
//
//
//
//   /*//*************************************************************************************************************/
//
//   // //CRIAR ARQUIVO E PASTA ADAPTADOS DO DE CIMA
//   // $scope.criarArquivo = function($cordovaFile) {
//   //
//   //     var results = iterateObject(veiculo);
//   //     console.log('Header: ' + results.header);
//   //     alert("Entrou no Criar Arquivo");
//   //     $cordovaFile.writeFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.header + results.headerNOK + "\n") , false)
//   //          .then(function (success) {
//   //
//   //            alert("Criou o novo arquivo com o header");
//   //          }, function (error) {
//   //
//   //            alert("Arquivo já existe dentro da pasta.");
//   //
//   //         }
//   // )};
//   //
//   //
//   //
//   //
//   // criarPasta = function($cordovaFile) {
//   //   // if($cordovaFile != null)
//   //   console.log('criar pasta');
//   //   if ($cordovaFile != undefined && $cordovaFile != null) {
//   //     $cordovaFile.createDir(cordova.file.externalRootDirectory, "L2R", true)
//   //       .then(function(success) {
//   //         $scope.criarArquivo($cordovaFile);
//   //
//   //       }, function(error) {
//   //         $scope.erroCriarPasta();
//   //       });
//   //   }
//   //
//   //   console.log('pasta criada');
//   // }
//   //
//   // criarPasta($cordovaFile);
//   // console.log('fim Grava');
//   // console.log('veiculo ' + $scope.veiculo);
//
//
//
//   /*//*************************************************************************************************************/
//
//
//
//
//
//
//   //Ir para a página de editar Veículo
//   $scope.ProdutoInvalido = function() {
//     console.log('veiculo ' + $scope.veiculo);
//
//     $state.go('app.editarProduto');
//     //event.preventDefault();
//
//
//
//     //window.location = "#/app/editarProduto";
//   };
//
//
//   // var obj = {
//   //   "PLACA": "1234567",
//   //   "MODELO": "ZEPPELIN",
//   //   "COR": "VERMELHO",
//   //   "PROCESSO": "123456789",
//   //   "CHASSI": "987654321",
//   //   "PATIO": "ALYSTRAZOR B",
//   //   "LOCALIZACAO": "RIO DE JANEIRO",
//   //   "ESTADO": "BOM"
//   // }
//
//
//
//   // FORMATAR PARA CSV = Baseado em https://jsfiddle.net/dhou6y3o/
//
//   //var obj = veiculo;
//
//
//   function iterateObject(obj, params) {
//     var value = '',
//       header = '',
//       headerNOK = '';
//     for (name in obj) {
//       if (obj.hasOwnProperty(name)) {
//         if (isObject(obj[name])) {
//           var out = iterateObject(obj[name]);
//           value += out.value;
//           header += out.header;
//
//           // if (params == 1) { //1 para testar, o correto seria 0
//           //   //Aqui devem ficar os novos values do ProdutoInvalido
//           //   headerNOK += out.header + 'NOK';
//           // }
//           //
//           headerNOK += out.header + ' NOK';
//
//         } else {
//           value += removeNewLine(obj[name]) + ', ';
//           header += name + ', ';
//           headerNOK += name + ' NOK' + ', ';
//         }
//       }
//     }
//
//     // //Apagar a última vírgula
//     // value = value.substring(0, value.length - 2);
//     // header = header.substring(0, header.length - 2);
//     // headerNOK = header.substring(0, header.length - 2);
//
//     return {
//       "value": value,
//       "header": header,
//       "headerNOK": headerNOK
//     };
//   }
//
//   function isObject(obj) {
//     return (typeof obj === 'object');
//   }
//
//   function removeNewLine(item) {
//     return item.toString().replace(/(\r\n|\n|\r)/gm, "");
//   }
//   //
//   // var results = iterateObject(obj);
//   // $('#resultValue').html(results.value);
//   // $('#resultHeader').html(results.header);
//
//
//
//   /*/*********************************************************************************/
//   // ////// CRIANDO UM FORMATAR PARA CSV COM OS 3 TIPO DE ENTRADA:
//   // 0 = PRODUTO NÃO OK (EDITADO, CONTENDO OS OBJETOS VEICULO E VEICULONOK)
//   // 1 = PRODUTO OK (CONTENDO SOMENTE VEICULO)
//   // 2 = PRODUTO NOVO (CONTENDO VEICULONOK E UM VEICULO VAZIO)
//
//   //
//   //
//   // function iterateObject(obj, objNOK, params) {
//   //   var value = '',
//   //     header = '',
//   //     valueNOK = '',
//   //     headerNOK = '';
//   //
//   //   if (params == 1) {
//   //     for (name in obj) {
//   //       if (obj.hasOwnProperty(name)) {
//   //         if (isObject(obj[name])) {
//   //           var out = iterateObject(obj[name]);
//   //           value += out.value;
//   //           header += out.header;
//   //
//   //           // if (params == 1) { //1 para testar, o correto seria 0
//   //           //   //Aqui devem ficar os novos values do ProdutoInvalido
//   //           //   headerNOK += out.header + 'NOK';
//   //           // }
//   //           //
//   //           // headerNOK += out.header + 'NOK';
//   //
//   //         } else {
//   //           value += removeNewLine(obj[name]) + ', ';
//   //           header += name + ', ';
//   //           // headerNOK += name + 'NOK' + ', ';
//   //         }
//   //       }
//   //     }
//   //   } else {
//   //     if (params == 0) {
//   //       for (name in objNOK) {
//   //         if (obj.hasOwnProperty(name)) {
//   //           if (isObject(obj[name])) {
//   //             var out = iterateObject(obj[name]);
//   //             value += out.value;
//   //             header += out.header;
//   //
//   //             // if (params == 1) { //1 para testar, o correto seria 0
//   //             //   //Aqui devem ficar os novos values do ProdutoInvalido
//   //             //   headerNOK += out.header + 'NOK';
//   //             // }
//   //             //
//   //             // headerNOK += out.header + 'NOK';
//   //
//   //           } else {
//   //             value += removeNewLine(obj[name]) + ', ';
//   //             header += name + ', ';
//   //             // headerNOK += name + 'NOK' + ', ';
//   //           }
//   //         }
//   //       }
//   //
//   //
//   //
//   //     }
//   //
//   //   }
//   //
//   //
//   //
//   //
//   //
//   //
//   //   //Termina aqui
//   //
//   //   // //Apagar a última vírgula
//   //   value = value.substring(0, value.length - 2);
//   //   header = header.substring(0, header.length - 2);
//   //   // headerNOK = header.substring(0, header.length - 2);
//   //
//   //   return {
//   //     "value": value,
//   //     "header": header,
//   //     // "headerNOK": headerNOK
//   //   };
//   // }
//   //
//   // function isObject(obj) {
//   //   return (typeof obj === 'object');
//   // }
//   //
//   // function removeNewLine(item) {
//   //   return item.toString().replace(/(\r\n|\n|\r)/gm, "");
//   // }
//   //
//
//
//
//
//
//
//
//
// })
//
// .service('Scopes', function() {
//   var ItemSelecionado;
//
//   return {
//     getItem: function() {
//       return ItemSelecionado;
//     },
//     setItem: function(value) {
//       ItemSelecionado = value;
//     }
//   };
//
//
//   //
//   // //Json Válido (veiculo)
//   // {         "PLACA": "1234567",
//   //           "MODELO": "ZEPPELIN",
//   //           "COR": "VERMELHO",
//   //           "PROCESSO": "123456789",
//   //           "CHASSI": "987654321",
//   //           "PATIO": "ALYSTRAZOR B",
//   //           "LOCALIZACAO": "RIO DE JANEIRO",
//   //           "ESTADO": "BOM"}
//
//

});

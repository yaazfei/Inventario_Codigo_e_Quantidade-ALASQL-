angular.module('starter').controller('cadastrarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, FormatarCsv, PopUps, CriarDiretorio) {



  console.log('Entrou no controller de Cadastrar Produto');

  $scope.veiculo = null;
  $scope.veiculoNOK = null;


  console.log('Scopes: ' + Scopes);
  //$scope.veiculo = Scopes.getItem();
  console.log('veiculo: ' + $scope.veiculo);


  //Definir Placeholder de Estado
  // $scope.estadoEscolhido = "ex.: Regular";
  // $scope.checkEstado = function (estado){
  //   $scope.estadoEscolhido = estado;
  //    };


  /*****************************************************************************/
  /*/ CRIAR NOVO PRODUTO /*/

  $scope.escreverNovoProduto = function(veiculoNOK) {

    console.log('Entrou no escrever Novo Produto');
    //console.log('Veiculo: ' + veiculo);

    $scope.veiculo = {
      PLACA: '',
      MODELO: '',
      COR: '',
      PROCESSO: '',
      CHASSI: '',
      PATIO: '',
      LOCALIZACAO: '',
      ESTADO: '',
      DATAENTRADA: '',
      STATUSLEILAO: '',
      LEILAO: '',
      RESTRICAO: '',
      DATALIBERACAO: '',
      DATACOLETA: '',
      USUARIOCOLETA: '',
      STATUS: ''
    };

    //$scope.veiculo.STATUS = '2';
    var data = new Date();
    var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes();

    // now.dateFormat();

    veiculoNOK.DATAENTRADA = '';
    veiculoNOK.STATUSLEILAO = '';
    veiculoNOK.LEILAO = '';
    veiculoNOK.RESTRICAO = '';
    veiculoNOK.DATALIBERACAO = '';
    veiculoNOK.DATACOLETA = dataFormatada;
    veiculoNOK.USUARIOCOLETA = 'Admin';
    veiculoNOK.STATUS = '2';

    console.log('Data: ' + veiculoNOK.DATACOLETA);

    // Scopes.setItem($scope.veiculoNOK);
    // veiculoNOK = Scopes.getItem();
    //
    // Scopes.setItem($scope.veiculo);
    // veiculo = Scopes.getItem();

    // if ($cordovaFile !== undefined && $cordovaFile !== null) {


    // var results = FormatarCsv.iterateObject(veiculoNOK, 2);
    var resultsNOK = FormatarCsv.iterateObject(veiculoNOK, 0);
    // PopUps.testeJson(resultsNOK);


    if (window.cordova) {
      // running on device/emulator


      // Checando se o arquivo existe
      CriarDiretorio.checarDiretorio($cordovaFile, $scope.veiculo);
      alert("Saiu do ChecarDiretorio");



      $timeout(function() {
        //Escrevendo
        alert("Vai escrever agora");
        $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (resultsNOK.blankValue + resultsNOK.value + '\n'))
          .then(function(success) {
            // $timeout(function() {

            alert("Salvou o produto");
            PopUps.produtoSalvo();
            $state.go('app.consultarProduto');
            Scopes.blankItem();


            }, function(error) {

              //$state.go('app.localizacao');
            // }, 1000);

          }, function(error) {
            PopUps.erroEscrever();
          });
      }, 500);


    }

    console.log('Saiu do WriteFile - Arquivo criado:' + resultsNOK.blankValue + resultsNOK.value);

  };


  // /*****************************************************************************/









  // //*****************************************************************************//
  //   //// Copiar logo os dados de Produto para ProdutoNOK
  //
  //
  // // $scope.manterDados = function (veiculo, veiculoNOK){
  // function manterDados(veiculo, veiculoNOK) {
  //
  //   veiculoNOK = veiculo;
  //   console.log('Veiculo NOK MODELO: ' + veiculoNOK.MODELO + '\n' + 'Veiculo NOK: ' + veiculoNOK.COR);
  //
  // }
  //
  // //*****************************************************************************//







  // //// POPUPS
  // $scope.carroSalvo = function() {
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Salvo',
  //     template: 'Veículo salvo com sucesso'
  //   });
  //
  // };
  // $scope.erroEscrever = function() {
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Erro',
  //     template: 'Não foi possivel salvar o veículo'
  //   });
  // };
  // $scope.erroCriarPasta = function() {
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Erro',
  //     template: 'Não foi possivel criar pasta L2R'
  //   });
  // };
  //
  //
  // //POP UP DE TESTE
  // $scope.testeJson = function(resultsNOK, results) {
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Teste Json',
  //     template: 'Resultado:\n' + resultsNOK.value + '\n' + results.value
  //   });
  // };
  //
  //
  // //POP UP DE TESTE
  // $scope.testeSubstituicao = function(nome, valorAntigo) {
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Teste Subs',
  //     template: 'Resultado:\n' + nome + valorAntigo
  //   });
  // };




  // /*****************************************************************************/
  // /*/ ESCREVER PRODUTO VÁLIDO /*/
  //
  //
  // $scope.escreverProdutoValido = function() {
  //
  //   veiculo.STATUS = '1';
  //
  //   console.log('veiculo: ' + $scope.veiculo);
  //   console.log('item: ' + Scopes.getItem());
  //   veiculo = Scopes.getItem();
  //
  //
  //   //$scope.escreverArquivoCSV(veiculo);
  //   //$cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.txt", $scope.veiculo.PLACA + "+1;")
  //   if ($cordovaFile !== undefined && $cordovaFile !== null) {
  //
  //     var results = FormatarCsv.iterateObject(veiculo, 1);
  //     $scope.testeJson('Sem NOK', results);
  //
  //
  //     $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.value + '\n'))
  //       .then(function(success) {
  //         $timeout(function() {
  //           $scope.carroSalvo();
  //           //$state.go('app.localizacao');
  //         }, 1000);
  //
  //         //$scope.escreverArquivoCSV(veiculo);
  //       }, function(error) {
  //         $scope.erroEscrever();
  //       });
  //   }
  //   console.log('Arquivo criado');
  // };
  //
  // $scope.escreverArquivoCSV = function(veiculo) {
  //   console.log('escreve arquivo csv');
  //   console.log('Veiculo:' + veiculo);
  //
  // };
  //
  //

  // /*****************************************************************************/
  // /*/ CRIAR NOVO PRODUTO /*/
  //
  //
  // $scope.escreverNovoProduto = function(veiculoNOK) {
  //
  //   console.log('Entrou no escrever novo veículo');
  //
  //   $scope.veiculo = {
  //     PLACA: '',
  //     MODELO: '',
  //     COR: '',
  //     PROCESSO: '',
  //     CHASSI: '',
  //     PATIO: '',
  //     LOCALIZACAO: '',
  //     ESTADO: '',
  //     DATAENTRADA: '',
  //     STATUSLEILAO: '',
  //     LEILAO: '',
  //     RESTRICAO: '',
  //     DATALIBERACAO: '',
  //     DATACOLETA: '',
  //     USUARIOCOLETA: '',
  //     STATUS: ''
  //   };
  //
  //   //$scope.veiculo.STATUS = '2';
  //   var now = new Date(); //Precisa ser formatada melhor
  //   // now.dateFormat();
  //
  //
  //   veiculoNOK.DATAENTRADA = '';
  //   veiculoNOK.STATUSLEILAO = '';
  //   veiculoNOK.LEILAO = '';
  //   veiculoNOK.RESTRICAO = '';
  //   veiculoNOK.DATALIBERACAO = '';
  //   veiculoNOK.DATACOLETA = now; //Date.now() or new Date();
  //   veiculoNOK.USUARIOCOLETA = 'Admin';
  //   veiculoNOK.STATUS = '2';
  //
  //   console.log('Data: ' + veiculoNOK.DATACOLETA);
  //
  //   // Scopes.setItem($scope.veiculoNOK);
  //   // veiculoNOK = Scopes.getItem();
  //   //
  //   // Scopes.setItem($scope.veiculo);
  //   // veiculo = Scopes.getItem();
  //
  //   if ($cordovaFile !== undefined && $cordovaFile !== null) {
  //
  //     var results = iterateObject(veiculo, 2);
  //     var resultsNOK = iterateObject(veiculoNOK, 0);
  //     $scope.testeJson(resultsNOK);
  //
  //     $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (resultsNOK.value + results.value + '\n'))
  //       .then(function(success) {
  //         $timeout(function() {
  //           $scope.carroSalvo();
  //
  //           //$state.go('app.localizacao');
  //         }, 1000);
  //       }, function(error) {
  //         $scope.erroEscrever();
  //       });
  //   }
  // };
  //

  // /*****************************************************************************/
  // /*/ ESCREVER PRODUTO INVÁLIDO - EDITAR /*/
  //
  // $scope.escreverProdutoInvalido = function(veiculo, veiculoNOK) {
  //
  //   console.log('Entrou no escrever veiculo inválido');
  //
  //
  //
  // /*/ MÉTODO PROVISÓRIO DE SUBSTITUIR OS VALORES NÃO EDITADOS PELO ANTIGOS
  //
  //   //// Verificar propriedades em branco
  //   // function checkNested(obj, objNOK) {
  //   //   var args = Array.prototype.slice.call(arguments, 1);
  //   //
  //   //   for (var i = 0; i < args.length; i++) {
  //   //     if (!obj || !obj.hasOwnProperty(args[i])) {
  //   //
  //   //       return false;
  //   //     }
  //   //     obj = obj[args[i]];
  //   //   }
  //   //   return true;
  //   // }
  //   //
  //   // var test = {level1:{level2:{level3:'level3'}} };
  //   //
  //   // checkNested(test, 'level1', 'level2', 'level3'); // true
  //   // checkNested(test, 'level1', 'level2', 'foo'); // false
  //
  //
  // /*//***************************************************************************/
  //
  // // // Outro modo de verificar propriedades em branco
  // // function manterDados(obj, objNOK) {
  // //   for (var p in objNOK) {
  // //     if (obj.hasOwnProperty(p)) {
  // //       if (objNOK[p] === null){
  // //         objNOK[p] = obj[p];
  // //       }
  // //       return objNOK;
  // //     }
  // //   }
  // //   // return objNOK;
  // // }
  // //
  // // // var obj = {one: 'one', two: 'two', three: 'three', four: null, fiv: null};
  // // //
  // // // alert(allButThreeNull(obj, 'one two three'.split(' '))); // true
  //
  //
  // /*//***************************************************************************/
  //
  //
  //   // manterDados(veiculo, veiculoNOK);
  //   console.log('Veiculo NOK MODELO: ' + veiculoNOK.MODELO);
  //
  //
  //   //veiculo.STATUS = '0';
  //
  //   var now = new Date();
  //   // now.format("dd/MM/yyyy HH:mm:ss");
  //
  //   veiculoNOK.DATAENTRADA = '';
  //   veiculoNOK.STATUSLEILAO = '';
  //   veiculoNOK.LEILAO = '';
  //   veiculoNOK.RESTRICAO = '';
  //   veiculoNOK.DATALIBERACAO = '';
  //   veiculoNOK.DATACOLETA = now; //Date.now() or new Date();
  //   veiculoNOK.USUARIOCOLETA = 'Admin';
  //   veiculoNOK.STATUS = '0';
  //
  //   console.log('Data: ' + veiculoNOK.DATACOLETA);
  //
  //   // Scopes.setItem($scope.veiculoNOK);
  //   // veiculoNOK = Scopes.getItem();
  //   // veiculoNOK = $scope.veiculoNOK;
  //
  //   // Scopes.setItem($scope.veiculo);
  //   // veiculo = Scopes.getItem();
  //   // veiculo = $scope.veiculo;
  //
  //   if ($cordovaFile !== undefined && $cordovaFile !== null) {
  //
  //     var resultsNOK = iterateObject(veiculoNOK, 0);
  //     var results = iterateObject(veiculo, 1);
  //     $scope.testeJson(results, resultsNOK);
  //
  //
  //
  //     $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (resultsNOK.value + results.value + '\n'))
  //       .then(function(success) {
  //         $timeout(function() {
  //           $scope.carroSalvo();
  //
  //           //$state.go('app.localizacao');
  //         }, 1000);
  //       }, function(error) {
  //         $scope.erroEscrever();
  //       });
  //   }
  // };



  // /*/************************************************************************************************************/
  // //// CRIAR ARQUIVO E PASTA ADAPTADOS
  //
  //
  //   $scope.criarArquivo = function($cordovaFile) {
  //
  //       var results = iterateObject(veiculo);
  //       console.log('Header: ' + results.header);
  //       alert("Entrou no Criar Arquivo");
  //       $cordovaFile.writeFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.header + results.headerNOK + "\n") , false)
  //            .then(function (success) {
  //
  //              alert("Criou o novo arquivo com o header");
  //            }, function (error) {
  //
  //              alert("Arquivo já existe dentro da pasta.");
  //
  //           }
  //   )};
  //
  //
  //
  //
  //   criarPasta = function($cordovaFile) {
  //     // if($cordovaFile != null)
  //     console.log('criar pasta');
  //     if ($cordovaFile != undefined && $cordovaFile != null) {
  //       $cordovaFile.createDir(cordova.file.externalRootDirectory, "L2R", true)
  //         .then(function(success) {
  //           $scope.criarArquivo($cordovaFile);
  //
  //         }, function(error) {
  //           $scope.erroCriarPasta();
  //         });
  //     }
  //
  //     console.log('pasta criada');
  //   }
  //
  //   criarPasta($cordovaFile);
  //   console.log('fim Grava');
  //   console.log('veiculo ' + $scope.veiculo);
  //
  //
  //
  //   /*/*************************************************************************************************************/







  //
  //
  //
  //
  //
  // $scope.check = function(nome, valorAntigo) {
  //   // function check(nome, valorAntigo)
  //     if (document.forms[editarVeiculoForm][nome].value === "")
  //       document.forms[editarVeiculoForm][nome].value = valorAntigo;
  //       $scope.testeSubstituicao(valorAntigo);
  //   };
  //



  // // FORMATAR PARA CSV = Baseado em https://jsfiddle.net/dhou6y3o/
  //
  // //var obj = veiculo;
  //
  // function iterateObject(obj, params) {
  //   var value = '',
  //     header = '',
  //     headerNOK = '';
  //   for (var name in obj) {
  //     if (obj.hasOwnProperty(name)) {
  //       if (isObject(obj[name])) {
  //         var out = iterateObject(obj[name]);
  //         value += out.value;
  //         header += out.header;
  //
  //         // if (params == 1) { //1 para testar, o correto seria 0
  //         //   //Aqui devem ficar os novos values do ProdutoInvalido
  //         //   headerNOK += out.header + 'NOK';
  //         // }
  //         //
  //         // headerNOK += out.header + ' NOK';
  //
  //       } else {
  //         value += removeNewLine(obj[name]) + ', ';
  //         header += name + ', ';
  //         headerNOK += name + ' NOK' + ', ';
  //       }
  //     }
  //   }
  //
  //   // //Apagar a última vírgula
  //   // value = value.substring(0, value.length - 2);
  //   // header = header.substring(0, header.length - 2);
  //   headerNOK = headerNOK.substring(0, headerNOK.length - 2);
  //   if (params == '0'){
  //     value = value.substring(0, value.length - 2);
  //   }
  //
  //   return {
  //     "value": value,
  //     "header": header,
  //     "headerNOK": headerNOK
  //   };
  // }
  //
  // function isObject(obj) {
  //   return (typeof obj === 'object');
  // }
  //
  // function removeNewLine(item) {
  //   return item.toString().replace(/(\r\n|\n|\r)/gm, "");
  // }
  // //
  // // var results = iterateObject(obj);
  // // $('#resultValue').html(results.value);
  // // $('#resultHeader').html(results.header);

});

/**
 * Inventario Base
 * COM ALASQL
 * @author Yasmin de Lima Feitosa
 * @version 1.0
 */

angular.module('starter').controller('novoProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, PopUps, CriarDiretorio, FormatarCsv) {

  console.log('Entrou no controller de Novo Produto  ---------------------------------------------------------');

  $scope.form = {};
  $scope.produto = {};
  $scope.cont = 0;
  $scope.formValid = false;
  $scope.codigoSalvoMessage = false;

  $scope.codSalvoMsg = function(dadosMax) {
    $scope.codigoSalvoMessage = true;
    $scope.message = "O produto '" + dadosMax.CODIGO + "' foi salvo com sucesso!";
    console.info('Código message: ' + $scope.codigoSalvoMessage);

    $timeout(function() {
      $scope.showMessage = true;
      $scope.codigoSalvoMessage = false;
    }, 2500);
  };

  $scope.$watch('NovoProduto', function() {
    console.info('NovoProduto watch');
    console.log($scope.formValid);
    //$scope.formValid = true;
  });



  $scope.setForm = function(form) {
    // console.log(" Entrou no setForm ******************************");

    $scope.form.NovoProduto = form;
    $scope.form.NovoProduto.$invalid = true;
    $scope.form.NovoProduto.$valid = false;
    $scope.form.Master = $scope.form.NovoProduto;
    // $scope.form.Master.$invalid = true;
    // $scope.form.Master.$invalid = true;
    console.log($scope.form.NovoProduto);
  };


  $scope.fecharApp = function() {
    console.log('Apertou o fechar');
    PopUps.showConfirm();
  };


  $scope.deixarPristine = function() {

    console.log("Entrou no deixarPristine");

    document.getElementById("form.NovoProduto").reset();
    document.getElementById("f_2").value = "";
    document.getElementById("f_1").value = "";
    $scope.produto = undefined;
    produto = undefined;

    $scope.form.NovoProduto = $scope.form.Master;
    $scope.form.NovoProduto.$setPristine();

    setTimeout(function() {
      $state.go('app.novoProduto');
      document.getElementById("f_1").focus();
      console.log("Entrou no setTimeout");
    }, 100);

  };



  $scope.jumpForm = function() {
    document.getElementById("f_1").blur();
    document.getElementById("f_2").focus();
  };


  $scope.clearInputAndSubmit = function(form, produto) {

    if (!($scope.form.NovoProduto.$valid &&
        $scope.form.NovoProduto.codigoProduto.$valid &&
        $scope.form.NovoProduto.quantidadeProduto.$valid) || $scope.formValid === false) {

      PopUps.erroBranco();
      $scope.cont = 0;
      $scope.zerarForm();

    } else {
      console.log('Entrou no clearInputAndSubmit');
      console.log(produto);
      $scope.dados2 = angular.copy(produto);

      document.getElementById("form.NovoProduto").reset();
      document.getElementById("f_2").value = "";
      $scope.produto = undefined;
      produto = undefined;

      $scope.escreverNovoProduto($scope.dados2);
    }
  };

  //INÍCIO DO CONTROLLER GERAL
  /*/*************************************************************************************************************/

  $scope.escreverNovoProduto = function(dadosMin) {
    console.log('Entrou no escrever Novo Produto');
    console.log('form valid?: ', $scope.formValid);

    $scope.cont = $scope.cont + 1; //Para impedir de rodar duas vezes
    console.log('Contador: ' + $scope.cont);

    if (!($scope.form.NovoProduto.$valid &&
        $scope.form.NovoProduto.codigoProduto.$valid &&
        $scope.form.NovoProduto.quantidadeProduto.$valid) || $scope.formValid === false ||
      (Number(dadosMin.QUANTIDADE) === 0)) {
      PopUps.erroBranco();
      $scope.cont = 0;
      $scope.zerarForm();


    } else {
      if ($scope.cont !== 1) { //// FEITO PARA NÃO DEIXAR QUE O controller RODE DUAS VEZES /// WITH GAMBI
        console.log("Tentou rodar mais de uma vez. WITH GAMBI");
        $scope.cont = 0;

      } else {

        $scope.cont = $scope.cont + 1;
        Scopes.setItem(dadosMin);

        var dados = {};
        dados = dadosMin;
        dados.CODIGO = dadosMin.CODIGO.toUpperCase();
        console.log(dados);

        var data = new Date();
        var dataFormatada = ("0" + data.getDate()).substr(-2) + "-" + ("0" + (data.getMonth() + 1)).substr(-2) + "-" + data.getFullYear();
        var filename = "Inventario" + "_" + dataFormatada;
        console.log("Nome do arquivo: " + filename);

        var arquivo = Scopes.getArquivo();
        var dadosNoHeader = {
          "0": dados.CODIGO,
          "1": dados.QUANTIDADE
        };

        if (arquivo !== "nd") { //SE HOUVER ARQUIVO LIDO FAZ O ALASQL

          console.log("Entrou no if = arquivo");
          //////// WHIT GAMBI (GUARDA TODOS COM A MESMA CHAPA DEPOIS ADICIONA JUNTO COM O PUSH DO BEM)
          // arquivo = Scopes.getArquivo();
          alasql.promise('SELECT * FROM ? WHERE [0] == ?', [arquivo, dados.CODIGO])
            .then(function(codsIguais) {
              //Encontrou todos com a mesma chapa
              console.log('Resultados encontrados: ' + codsIguais.length);

              if (codsIguais.length < 1) {

                console.log('Não encontrou nenhum igual então deve criar um novo.');
                arquivo.push(dadosNoHeader); //Já colocou o Bem editado nos Bens  ////Não funfa
                arquivo2 = FormatarCsv.toString(arquivo); // Verificar se existem line breaks antes de ler suas propriedades
                salvarNovoProduto(arquivo2, filename, dados);

              } else { ////Se existir mais de um

                var promise = PopUps.codigoIgual($scope, '<p align="center">O Produto ' + dados.CODIGO + ' já consta nos arquivos.\n O que deseja fazer?</p>');
                promise.then(function(response) {
                  // quant = Scopes.getQuant();

                  if ($scope.adicionar) { /// Se quis que incrementasse
                    var produtoAntigo = codsIguais[0];
                    console.log('Produto Antigo: ' + produtoAntigo[1]);
                    novaQuant = Number(produtoAntigo[1]) + Number(dados.QUANTIDADE);

                    var dadosNoHeader = {
                      "0": dados.CODIGO,
                      "1": novaQuant
                    };
                    console.log('Produto Novo: ' + dadosNoHeader[1]);

                    alasql.promise('SELECT * FROM ? WHERE [0] !== ?', [arquivo, dados.CODIGO])
                      .then(function(arquivoNovo) {
                        /////Seleciona todos os codsIguais menos o que é repetido

                        console.log('Encontrou os diferentes então vai fazer o push com o produto editado.');
                        arquivoNovo.push(dadosNoHeader); //Já colocou o Produto editado nos Produtos
                        arquivo2 = FormatarCsv.toString(arquivoNovo); // Verificar se existem line breaks antes de ler suas propriedades

                        salvarNovoProduto(arquivo2, filename, dados);

                      }).catch(function(err) { // NÃO ENCONTROUOS PRODUTOS DIFERENTES
                        console.log(err);
                        PopUps.erroConsultar("Não foi possível salvar o Produto!");
                        $scope.cont = 0;
                      });

                  } else { //// SE Ignorou

                    $scope.showMessage = true;
                    $scope.message = 'O produto ' + dados.CODIGO + ' não foi adicionado!';
                    console.log($scope.message);
                    $scope.cont = 0;

                    document.getElementById("form.NovoProduto").reset();
                    document.getElementById("f_2").value = "";
                    $scope.produto = undefined;
                    produto = undefined;

                    $scope.form.NovoProduto = $scope.form.Master;
                    $scope.form.NovoProduto.$setPristine();

                    $state.go('app.novoProduto');
                    document.getElementById("f_2").blur();
                    document.getElementById("f_1").focus();

                  }
                }, function(reason) { /////// >>>>>>>>>>>>>> FIM DO PROMISSE ASYNC
                  console.log(reason);
                  $scope.cont = 0;
                });
              }
            }).catch(function(err) { // NÃO ENCONTROU O BEM
              console.log(err);
              PopUps.erroConsultar("Não foi possível salvar o Produto!");
              $scope.cont = 0;
            });

        } else {
          console.log('Não encontrou arquivo interno então deve criar um novo.');
          arquivo = [dadosNoHeader]; //Já colocou o Produto editado nos Bens
          salvarNovoProduto(arquivo, filename, dados);
        }
      }
    }
  };


  function salvarNovoProduto(arquivo, filename, dados) {

    if (window.cordova) {

      var promise = CriarDiretorio.processar($cordovaFile, arquivo, filename, dados);
      promise.then(function(response) {

        $scope.showMessage = true;
        $scope.message = Scopes.getItem();
        $scope.codSalvoMsg(dados);
        console.log($scope.message);
        $scope.cont = 0;

        $scope.zerarForm(dados);

      }, function(reason) { /////// >>>>>>>>>>>>>> FIM DO PROMISSE ASYNC
        console.log(reason);
        $scope.cont = 0;
      });

    } else {

      console.log('Se estiver no Browser, não vai escrever no arquivo.');
      $scope.showMessage = true;
      $scope.message = Scopes.getItem();
      $scope.codSalvoMsg(dados);
      console.log($scope.message);
      $scope.cont = 0;

      $scope.zerarForm(dados);
    }
  }

  $scope.zerarForm = function(dados) {
    ////////////// WITH GAMBI

    document.getElementById("form.NovoProduto").reset();
    $scope.produto = undefined;

    if ($scope.form.Master.$valid) {
      $scope.form.Master.$invalid = true;
      $scope.form.Master.$valid = false;
      $scope.form.Master.codigoProduto.$valid = false;
      $scope.form.Master.quantidadeProduto.$valid = false;
      $scope.form.Master.codigoProduto.$invalid = true;
      $scope.form.Master.quantidadeProduto.$invalid = true;
    }

    $scope.form.NovoProduto = $scope.form.Master;
    $scope.form.NovoProduto.$setPristine();

    document.getElementById("f_2").blur();
    document.getElementById("f_1").focus();

  };
});

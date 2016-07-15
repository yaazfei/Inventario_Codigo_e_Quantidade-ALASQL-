
angular.module('starter').controller('consultarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes, FormatarCsv, PopUps, CriarDiretorio) {


//CriarDiretorio.criarPasta($cordovaFile);

  //****************************************************************************************//

//  Scopes.blankItem();

  // /*/************************************************************************************************************/
  //   //// CRIAR ARQUIVO E PASTA ADAPTADOS
  //
  //
  //   $scope.criarArquivo = function($cordovaFile) {
  //
  //     // alert("Entrou no Criar Arquivo");
  //
  //     var results = FormatarCsv.iterateObject(veiculo);
  //
  //     // var header = {PLACA, MODELO, COR, PROCESSO, CHASSI, PATIO, LOCALIZACAO, ESTADO, DATAENTRADA, STATUSLEILAO, LEILAO, RESTRICAO, DATALIBERACAO, DATACOLETA, USUARIOCOLETA, STATUS, };
  //     // var headerNOK = {PLACA NOK, MODELO NOK, COR NOK, PROCESSO NOK, CHASSI NOK, PATIO NOK, LOCALIZACAO NOK, ESTADO NOK, DATAENTRADA NOK, STATUSLEILAO NOK, LEILAO NOK, RESTRICAO NOK, DATALIBERACAO NOK, DATACOLETA NOK, USUARIOCOLETA NOK};
  //     //
  //     // console.log('Header: ' + results.header);
  //     // $cordovaFile.writeFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (header + headerNOK + "\n"), false)
  //
  //     console.log('Header: ' + results.header);
  //     $cordovaFile.writeFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.header + results.headerNOK + "\n"), false)
  //       .then(function(success) {
  //
  //         // alert("Criou o novo arquivo com o header");
  //         console.log('Criou o novo arquivo com o header');
  //
  //       }, function(error) {
  //
  //         // alert("Arquivo já existe dentro da pasta.");
  //         console.log('Arquivo já existe dentro da pasta.');
  //
  //       });
  //   };
  //
  //
  //
  //
  //   criarPasta = function($cordovaFile) {
  //     // if($cordovaFile != null)
  //
  //     console.log('Entrou no Criar Pasta');
  //     // alert("Entrou no Criar Pasta");
  //
  //
  //     if ($cordovaFile !== undefined && $cordovaFile !== null) {
  //       $cordovaFile.createDir(cordova.file.externalRootDirectory, "L2R", true)
  //         .then(function(success) {
  //           $scope.criarArquivo($cordovaFile);
  //           console.log('Criou a pasta.');
  //
  //         }, function(error) {
  //
  //           PopUps.erroCriarPasta();
  //           // alert("Arquivo já existe dentro da pasta.");
  //           console.log('Não criou a pasta.');
  //
  //         });
  //     }
  //
  //     console.log('Fim do Gravar Pasta');
  //     // console.log('Veiculo: ' + $scope.veiculo);
  //
  //   };
  //
  // //  criarPasta($cordovaFile); // x - x - x - x - x - x - x - x - x - x - COMENTADO PARA TESTE EM BROWSER -  x - x - x - x - x - x - x - x - x - x
  //
  //
  //
  //
  //

//*******************************************************************************************************//
// Consultar pelo web service


  $scope.consultarProduto = function(dados) {
    //dados = 'LC000000012157';
    if (dados === "" || dados === undefined) {
      PopUps.erroBranco();
    } else {
      var req = {
        method: 'POST',
        url: 'http://patiodemo.dsin.com.br/coletorinventario/busca',
        headers: {
          'authorization': "Basic " + btoa('dsinColetor:dsinColetor')
        },
        params: {
          lacre: dados.codigo
        }
      };

      // LC000000012157
      $http(req).then(function mySucces(response) {
        //olhar isso. O response.data retorna mais de um veículo.
        // response.data =

        //MOCK
        response.data = [];

        response.data.push({

          PLACA: 'ABC-4567',
          MODELO: 'PUMA GTS 1.6',
          COR: 'PRATA',
          PROCESSO: '123456789',
          CHASSI: '987654321',
          PATIO: 'COND. GIRASSÓIS',
          LOCALIZACAO: 'RIO DE JANEIRO',
          ESTADO: 'BOM',
          DATAENTRADA: '06/06/2016 18:16',
          STATUSLEILAO: 'EM ESPERA',
          LEILAO: '876804-2',
          RESTRICAO: '',
          DATALIBERACAO: '',
          DATACOLETA: '"16/06/2016 17:17"',
          USUARIOCOLETA: 'ADMIN',
          STATUS: '1'
        });



        var obj = response.data.pop();
        if (response.data !== null) {
          for (i = 0; i < response.data.length; i++) {
            console.log('Objeto retornado pelo serviço: ' + response.data[i]);
          }
        }

        // var arr = Object.keys(obj).map(function(k) { return obj[k] });
        // console.log('Objeto transformado em array: '+arr);
        // $scope.getArray = [];
        // $scope.getArray.push({a: Math.floor((Math.random()*10)+1), b: Math.floor((Math.random()*10)+1)});

        // Scopes.ItemSelecionado = obj;
        Scopes.setItem(obj);
        veiculo = Scopes.getItem();

        console.log('Scopes: ->' + Scopes);
        console.log('Scope: ' + Scopes.getItem());



        if (window.cordova) {
          // running on device/emulator

          CriarDiretorio.criarPasta($cordovaFile, veiculo); // x - x - x - x - x - x - x - x - x - x - DEVE SER COMENTADO PARA TESTE EM BROWSER -  x - x - x - x - x - x - x - x - x - x
        }



        $state.go('app.infoProduto');

      }, function myError(response) {
        $scope.mensagem = response.statusText;
        PopUps.erroConsultar(response.statusText);

      });
      dados.codigo = "";
    }

  };





  /*/*************************************************************************************************************/




});

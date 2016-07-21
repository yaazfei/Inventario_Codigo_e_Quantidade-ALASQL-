angular.module('starter').controller('consultarLocalCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes, FormatarCsv, PopUps, CriarDiretorio) {


  console.log('Códigos de locais válidos: 000053, 000039, 000005');

  $scope.fecharApp = function() {
    console.log('Apertou o fechar');
    PopUps.showConfirm();

  };



  $scope.buscaLocal = function(dados) {
    //$scope.message = "Produto " + dados.codigo + " foi salvo com sucesso!";

    if (dados.codigoLocal === undefined || dados.codigoLocal === "") {

      PopUps.erroBranco();

    } else {

      console.log('Dados: ' + dados);
      Scopes.setLocal(dados);
      //var local = Scopes.getLocal();


      // var data = new Date();
      // var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
      // var folder = "Inventario" + "_" + dataFormatada + ".csv";

      // $scope.message = Scopes.getItem();

      if (window.cordova) {


        CriarDiretorio.processar($cordovaFile, dados);
        //alert("Passou do CriarDiretorio.processar");


      }

      $state.go('app.consultarProduto');


    }
  };









  //*******************************************************************************************************//
  // Consultar pelo web service

  //
  // $scope.consultarProduto = function(dados) {
  //   //dados = 'LC000000012157';
  //   if (dados === "" || dados === undefined) {
  //     PopUps.erroBranco();
  //   } else {
  //     var req = {
  //       method: 'POST',
  //       url: 'http://patiodemo.dsin.com.br/coletorinventario/busca',
  //       headers: {
  //         'authorization': "Basic " + btoa('dsinColetor:dsinColetor')
  //       },
  //       params: {
  //         lacre: dados.codigo
  //       }
  //     };
  //
  //     // LC000000012157
  //     $http(req).then(function mySucces(response) {
  //       //olhar isso. O response.data retorna mais de um veículo.
  //       // response.data =
  //
  //       //MOCK
  //       response.data = [];
  //
  //       response.data.push({
  //
  //         PLACA: 'ABC-4567',
  //         MODELO: 'PUMA GTS 1.6',
  //         COR: 'PRATA',
  //         PROCESSO: '123456789',
  //         CHASSI: '987654321',
  //         PATIO: 'COND. GIRASSÓIS',
  //         LOCALIZACAO: 'RIO DE JANEIRO',
  //         ESTADO: 'BOM',
  //         DATAENTRADA: '06/06/2016 18:16',
  //         STATUSLEILAO: 'EM ESPERA',
  //         LEILAO: '876804-2',
  //         RESTRICAO: '',
  //         DATALIBERACAO: '',
  //         DATACOLETA: '"16/06/2016 17:17"',
  //         USUARIOCOLETA: 'ADMIN',
  //         STATUS: '1'
  //       });
  //
  //
  //
  //       var obj = response.data.pop();
  //       if (response.data !== null) {
  //         for (i = 0; i < response.data.length; i++) {
  //           console.log('Objeto retornado pelo serviço: ' + response.data[i]);
  //         }
  //       }
  //
  //       // var arr = Object.keys(obj).map(function(k) { return obj[k] });
  //       // console.log('Objeto transformado em array: '+arr);
  //       // $scope.getArray = [];
  //       // $scope.getArray.push({a: Math.floor((Math.random()*10)+1), b: Math.floor((Math.random()*10)+1)});
  //
  //       // Scopes.ItemSelecionado = obj;
  //       Scopes.setItem(obj);
  //       veiculo = Scopes.getItem();
  //
  //       console.log('Scopes: ->' + Scopes);
  //       console.log('Scope: ' + Scopes.getItem());
  //
  //
  //
  //       if (window.cordova) {
  //         // running on device/emulator
  //
  //         CriarDiretorio.criarPasta($cordovaFile, veiculo); // x - x - x - x - x - x - x - x - x - x - DEVE SER COMENTADO PARA TESTE EM BROWSER -  x - x - x - x - x - x - x - x - x - x
  //       }
  //
  //
  //
  //       $state.go('app.infoProduto');
  //
  //     }, function myError(response) {
  //       $scope.mensagem = response.statusText;
  //       PopUps.erroConsultar(response.statusText);
  //
  //     });
  //     dados.codigo = "";
  //   }
  //
  // };


  /*/*************************************************************************************************************/




});

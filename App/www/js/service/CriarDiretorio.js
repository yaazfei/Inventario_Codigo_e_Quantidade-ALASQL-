angular.module("starter").service('CriarDiretorio', function($cordovaFile, FormatarCsv) {



  /*/************************************************************************************************************/
  //// CRIAR ARQUIVO E PASTA ADAPTADOS

  criarArquivo = function($cordovaFile, veiculo) {

    // alert("Entrou no Criar Arquivo");

    var results = FormatarCsv.iterateObject(veiculo);

    // var header = {PLACA, MODELO, COR, PROCESSO, CHASSI, PATIO, LOCALIZACAO, ESTADO, DATAENTRADA, STATUSLEILAO, LEILAO, RESTRICAO, DATALIBERACAO, DATACOLETA, USUARIOCOLETA, STATUS, };
    // var headerNOK = {PLACA NOK, MODELO NOK, COR NOK, PROCESSO NOK, CHASSI NOK, PATIO NOK, LOCALIZACAO NOK, ESTADO NOK, DATAENTRADA NOK, STATUSLEILAO NOK, LEILAO NOK, RESTRICAO NOK, DATALIBERACAO NOK, DATACOLETA NOK, USUARIOCOLETA NOK};
    //
    // console.log('Header: ' + results.header);
    // $cordovaFile.writeFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (header + headerNOK + "\n"), false)

    console.log('Header: ' + results.header);
    $cordovaFile.writeFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.header + results.headerNOK + "\n"), false)
      .then(function(success) {

        alert("Criou o novo arquivo com o header");
        //console.log('Criou o novo arquivo com o header');

      }, function(error) {

        alert("Arquivo já existe dentro da pasta.");
        //  console.log('Arquivo já existe dentro da pasta.');

      });
  };




  this.criarPasta = function($cordovaFile, veiculo) {
    // if($cordovaFile != null)

    console.log('Entrou no Criar Pasta');
    alert("Entrou no Criar Pasta");


    if ($cordovaFile !== undefined || $cordovaFile !== null) {
      $cordovaFile.createDir(cordova.file.externalRootDirectory, "L2R", true)
        .then(function(success) {
          criarArquivo($cordovaFile, veiculo);
          alert("Criou a pasta e o arquivo");


        }, function(error) {

          PopUps.erroCriarPasta();
          alert("Não criou a pasta");


        });
    }

    console.log('Fim do Gravar Pasta');
    // console.log('Veiculo: ' + $scope.veiculo);

  };



  /*/************************************************************************************************************/


  // Checando se o arquivo existe

  this.checarDiretorio = function($cordovaFile, veiculo) {

    alert("Entrou no ChecarDiretorio");
    $cordovaFile.checkDir(cordova.file.externalRootDirectory, "L2R")
      .then(function(sucess) {
        // Encontra a pasta
        checarArquivo($cordovaFile, veiculo);
        alert("Encontrou a pasta com o checkDir");


      }, function(error) {
        // Não encontra a pasta
        alert("Não encontrou a pasta com o checkDir");
        criarPasta($cordovaFile, veiculo);
        alert("Criou a pasta");
      });

    alert("Terminou o checkDir");


  };



  checarArquivo = function($cordovaFile, veiculo) {

    //Checando se há arquivo dentro da pasta
    $cordovaFile.checkFile(cordova.file.externalRootDirectory, "L2R/veiculos.csv")
      .then(function(sucess) { // Encontrou

        // se encontrar o arquivo:
        alert("Encontrou o arquivo então não criou um novo.");

      }, function(error) { //Não encontrou

        // se não encontrar o arquivo:
        criarArquivo($cordovaFile, veiculo);
        alert("Não encontrou o arquivo, então criou um novo.");
      });
  };



  /*/************************************************************************************************************/





});

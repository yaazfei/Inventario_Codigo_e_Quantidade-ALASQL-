angular.module("starter").service('CriarDiretorio', function($cordovaFile, FormatarCsv, PopUps, $state, Scopes) {


  //////////////////////////
  //////// B1 METHOD //////
  /////////////////////////

  this.processar = function($cordovaFile, res) {

    dados = FormatarCsv.JSONToCSVConvertor(res, true);
    // console.log(dados);
    //console.log('Header: ' + dados.header);

    $cordovaFile.createDir(cordova.file.externalRootDirectory, "Queiroz Galvão", false)
      .then(function(success) {
        console.log('log: Criou o diretorio vazio');

        // $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv" , (dados), true)
        $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv", (dados), true)
          .then(function(success) {
            console.log('log: Escreveu/Reescreveu o arquivo .csv');
            //$scope.bemEncontrado = null;
            Scopes.setArquivo(res); //MELHOR DEIXAR PRA FAZER ISSO AQUI, DEPOIS DE SALVAR NO ARQUIVO

            PopUps.produtoSalvo('Bem salvo com sucesso!');
            $state.go('app.consultarProduto');


          }, function(error) {

            console.log('log: Não conseguiu escrever no arquivo');
            //alert("Não conseguiu escrever no arquivo existente");
            PopUps.erroEscrever();

          });

      }, function(error) {

        console.log('log: Não criou o diretorio');

        $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv", (dados), true)
          .then(function(success) {
            console.log('log: Escreveu no arquivo vazio');
            //$scope.bemEncontrado = null;
            Scopes.setArquivo(res); //MELHOR DEIXAR PRA FAZER ISSO AQUI, DEPOIS DE SALVAR NO ARQUIVO

            PopUps.produtoSalvo('Bem salvo com sucesso!');
            $state.go('app.consultarProduto');

          }, function(error) {

            console.log('log: Não escreveu no arquivo criado');
            PopUps.erroEscrever();

          });
      });
  };

  /*/************************************************************************************************************/


});

angular.module("starter").service('CriarDiretorio', function($cordovaFile, FormatarCsv, PopUps, $state) {


  /*/************************************************************************************************************/

  //////////////////////////
  //////// B1 METHOD //////
  /////////////////////////


  this.processar = function($cordovaFile, res) {
    //alert("Entrou no processar");

    console.log(res);
    dados = FormatarCsv.JSONToCSVConvertor(res, true);
    // console.log(dados);

    $cordovaFile.createDir(cordova.file.externalRootDirectory, "Queiroz Galvão", false)
      .then(function(success) {
        console.log('log: Criou diretorio vazio');

        // $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv" , (dados), true)
        $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv", (dados), true)
        .then(function(success) {
          console.log('log: Escreveu/Reescreveu o arquivo .csv');

          // //Não sei se funciona
          // $cordovaFile.writeFile(cordova.file.applicationDirectory + "www/files", "Lista_de_Bens.csv", (dados), true)
          //   .then(function(success) {
              // console.log('log: Escreveu um arquivo .csv dentro do /files');

              PopUps.produtoSalvo('Bem salvo com sucesso!');
              $state.go('app.consultarProduto');

            // });

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
            PopUps.produtoSalvo('Bem salvo com sucesso!');
            //$scope.bemEncontrado = null;
            $state.go('app.consultarProduto');

          }, function(error) {

            console.log('log: Não escreveu no arquivo criado');
            PopUps.erroEscrever();

          });

      });

  };

  /*/************************************************************************************************************/



});

/**
 * Inventario Base
 * COM ALASQL
 * @author Yasmin de Lima Feitosa
 * @version 1.0
 */

 angular.module("starter").service('CriarDiretorio', function($cordovaFile, $ionicHistory, FormatarCsv, PopUps, $state, Scopes, $q) {


  //////////////////////////
  //////// B1 METHOD //////
  /////////////////////////

  this.processar = function($cordovaFile, res, nomeArquivo, produto) {

    var defer = $q.defer();
    var cod = produto.CODIGO;
    var quant = produto.QUANTIDADE;
    var dados = FormatarCsv.JSONToCSVConvertor(res, true);
    // var dados = FormatarCsv.toString(res);
    filename = nomeArquivo  + ".csv";
    var foldername = "Nimal Inventario Simples";


    $cordovaFile.createDir(cordova.file.externalRootDirectory, foldername, false)
      .then(function(success) {
        console.log('log: Criou o diretorio vazio');
        console.log('log: Como acabou de criar o diretório, ele vai criar logo o arquivo .csv com o header e os primeiros valores');

        // $cordovaFile.writeFile(cordova.file.externalRootDirectory + foldername, filename , (dados), true)
        $cordovaFile.writeFile(cordova.file.externalRootDirectory + foldername, filename, (dados), true)
          .then(function(success) {
            console.log('log: Escreveu/Reescreveu o arquivo .csv');

            Scopes.setArquivo(res); //MELHOR DEIXAR PRA FAZER ISSO AQUI, DEPOIS DE SALVAR NO ARQUIVO

            defer.resolve(success);
            var message = "O Produto '" + cod + "' foi salvo com sucesso!";
            Scopes.setMessage(message);



          }, function(error) {

            console.log('log: Não conseguiu escrever no arquivo');
            //alert("Não conseguiu escrever no arquivo existente");
            defer.reject(error);
            PopUps.erroEscrever();

          });

      }, function(error) {

        console.log('log: Não criou o diretorio / Já existente');

        $cordovaFile.writeFile(cordova.file.externalRootDirectory + foldername, filename, (dados), true)
          .then(function(success) {
            console.log('log: Escreveu/Reescreveu .csv o arquivo dentro do diretório');
            //$scope.bemEncontrado = null;
            Scopes.setArquivo(res); //MELHOR DEIXAR PRA FAZER ISSO AQUI, DEPOIS DE SALVAR NO ARQUIVO

            defer.resolve(success);
            var message = "O Produto '" + cod + "' foi salvo com sucesso!";
            Scopes.setMessage(message);


          }, function(error) {

            console.log('log: Não escreveu no arquivo criado');
            defer.reject(error);
            PopUps.erroEscrever();

          });

      });


    return defer.promise;
  };

  /*/************************************************************************************************************/


});

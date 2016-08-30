angular.module("starter").service('buscaArquivos', function($cordovaFile, Scopes, PopUps, $state, $q) {


this.checarArquivo = function($cordovaFile) {
      var defer = $q.defer();
    //alert("Entrou no processar");

//async.series([
    $cordovaFile.checkDir(cordova.file.externalRootDirectory, "Queiroz Galvão")
      .then(function(success) {
        console.log('log: Achou o diretorio');


        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz Galvão/Lista_de_Bens.csv")
          .then(function(success) {
            console.log('log: Achou o arquivo .csv');

            // //COPIAR PARA UMA VARIÁVEL COM O ANGULAR.COPY
            // angular.copy(source, [destination]);

            //SÓ LÊ O ARQUIVO E COLOCAR EM UMA VARIÁVEL
            $cordovaFile.readAsText(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv")
                 .then(function (success) {



                   console.log("Leu o arquivo CSV");
                   Scopes.setArquivo(success);
                   console.log("Copiou o arquivo CSV");
                   defer.resolve(success);

                 }, function (error) {

                   console.log ( "Não leu o arquivo CSV: " + error);
                   defer.reject(success);
                   // error
                 });


            // //MELHOR COPIAR? PRA ONDE?
            // $cordovaFile.copyFile(cordova.file.externalRootDirectory, "Queiroz Galvão/Lista_de_Bens.csv", cordova.file.externalApplicationStorageDirectory, "Lista_de_Bens.csv")
            //   .then(function(success) {
            //     console.log('Copiou o arquivo .csv para o /Android/data/com.ionicframework.myaoo100386/');
            //
            //     // dir = /Android/data/com.ionicframework.myaoo100386/
            //     //dir = "file:///data/data/com.ionicframework.myaoo100386/files/";   //ESSE APARENTEMENTE FUNCIONA, SÓ QUE NADA É COPIADO PARA LÁ.
            //     //Scopes.setArquivo("csv");
            //     //dir = "/android_asset/www/files/Lista_de_Bens.csv";
            //
            //     alaSQLBuscas.buscarCSV();
            //
            //   }, function(error) {
            //     console.log('Não copiou o arquivo: ' + error);
            //   });




          }, function(error) {
            console.log('log: Não achou o arquivo .csv, vai procurar por outro');


            $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz Galvão/Lista_de_Bens.xlsx")
              .then(function(success) {
                console.log('log: Achou o arquivo .xlsx');
                // Scopes.setArquivo("xlsx");



                //SÓ LÊ O ARQUIVO E COLOCAR EM UMA VARIÁVEL
                $cordovaFile.readAsText(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xlsx")
                     .then(function (success) {

                       console.log("Leu o arquivo XLSX");
                       Scopes.setArquivo(success);
                       console.log("Copiou o arquivo XLSX");
                       defer.resolve(success);


                     }, function (error) {

                       console.log ( "Não leu o arquivo XLSX: " + error);
                       defer.reject(success);
                       // error
                     });




              }, function(error) {
                console.log('log: Não achou o arquivo .xlsx, vai procurar por outro');


                $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz Galvão/Lista_de_Bens.xls")
                  .then(function(success) {
                    console.log('log: Achou o arquivo .xls');
                    // Scopes.setArquivo("xls");


                    //SÓ LÊ O ARQUIVO E COLOCAR EM UMA VARIÁVEL
                    $cordovaFile.readAsText(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xls")
                         .then(function (success) {

                           console.log("Leu o arquivo XLS");
                           Scopes.setArquivo(success);
                           console.log("Copiou o arquivo XLX");
                           defer.resolve(success);



                         }, function (error) {

                           console.log ( "Não leu o arquivo XLS: " + error);
                           defer.reject(success);
                           // error
                         });





                  }, function(error) {
                    Scopes.setArquivo("nd");
                    console.log('log: Não encontrou o arquivo .xls');
                    console.log('log: Não encontrou nenhum arquivo. Vai pegar o arquivo interno.' + error);
                    defer.reject(success);

                  });

              });

          });


      }, function(error) { // Não achou o diretório

        console.log('log: Não encontrou o diretório. Vai pegar o arquivo interno.' + error);
        Scopes.setArquivo("nd");
        defer.reject(success);

      });
//]);

return defer.promise;
  };
  //return Scopes.getArquivo();
  //$scope.log = "Fez";

});

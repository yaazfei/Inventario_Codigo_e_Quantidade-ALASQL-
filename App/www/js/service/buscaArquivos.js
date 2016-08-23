angular.module("starter").service('buscaArquivos', function($cordovaFile, Scopes, PopUps, $state) {


  this.checarArquivo = function($cordovaFile) {
    //alert("Entrou no processar");


    $cordovaFile.checkDir(cordova.file.externalRootDirectory, "Queiroz GalvÃ£o")
      .then(function(success) {
        console.log('log: Achou o diretorio');


        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz GalvÃ£o/Lista_de_Bens.csv")
          .then(function(success) {
            console.log('log: Achou o arquivo .csv');
            //alert("CAMINHO DO APP :" + window.location.pathname);



            //MELHOR COPIAR? PRA ONDE?
            $cordovaFile.copyFile(cordova.file.externalRootDirectory, "Queiroz GalvÃ£o/Lista_de_Bens.csv", cordova.file.externalDataDirectory + "www/files/Lista_de_Bens.csv")
              .then(function(success) {
                console.log('Copiou o arquivo .csv para o /files');
                //Scopes.setArquivo("csv");
                //dir = "/android_asset/www/files/Lista_de_Bens.csv";






              }, function(error) {
                console.log('NÃ£o copiou o arquivo: ' + error);
              });


          }, function(error) {
            console.log('log: NÃ£o achou o arquivo .csv, vai procurar por outro');


            $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz GalvÃ£o/Lista_de_Bens.xlsx")
              .then(function(success) {
                console.log('log: Achou o arquivo .xlsx');
                Scopes.setArquivo("xlsx");


              }, function(error) {
                console.log('log: NÃ£o achou o arquivo .xlsx, vai procurar por outro');


                $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz GalvÃ£o/Lista_de_Bens.xls")
                  .then(function(success) {
                    console.log('log: Achou o arquivo .xls');
                    Scopes.setArquivo("xls");


                  }, function(error) {
                    Scopes.setArquivo("nd");
                    console.log('log: NÃ£o encontrou o arquivo .xls');
                    console.log('log: NÃ£o encontrou nenhum arquivo. Vai pegar o arquivo interno.' + error);

                  });

              });

          });


      }, function(error) { // NÃ£o achou o diretÃ³rio

        console.log('log: NÃ£o encontrou o diretÃ³rio. Vai pegar o arquivo interno.' + error);
        Scopes.setArquivo("nd");

      });

  };

  //return Scopes.getArquivo();
  //$scope.log = "Fez";

});

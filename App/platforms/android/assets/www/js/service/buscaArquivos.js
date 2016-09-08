angular.module("starter").service('buscaArquivos', function($cordovaFile, Scopes, PopUps, $state, $q, FormatarCsv) {


  this.checarArquivo = function($cordovaFile) {
    var defer = $q.defer();

    $cordovaFile.checkDir(cordova.file.externalRootDirectory, "Queiroz Galvão")
      .then(function(success) {
        console.log('log: Achou o diretorio');


        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz Galvão/Lista_de_Bens.csv")
          .then(function(success) {
            console.log('log: Achou o arquivo .csv');


            //SÓ LÊ O ARQUIVO E COLOCA EM UMA VARIÁVEL
            $cordovaFile.readAsText(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv")
              .then(function(success) {


                console.log("Leu o arquivo CSV");
                dados = FormatarCsv.csvTojs(success);
                Scopes.setArquivo(dados);
                console.log("Copiou o arquivo CSV");
                defer.resolve(success);

              }, function(error) {

                console.log("Não leu o arquivo CSV: " + error);
                defer.reject(error);
                //defer.resolve(error);

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



                //SÓ LÊ O ARQUIVO E COLOCA EM UMA VARIÁVEL
                // $cordovaFile.readAsText(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xlsx")
                //      .then(function (success) {

                //dir = "files/Lista_de_Bens.xlsx";

                console.log('log: Vai pegar o .xlsx do SDCARD');
                dir = "/storage/emulated/0/Queiroz Galvão/Lista_de_Bens.xlsx";

                var url = dir;
                var oReq = new XMLHttpRequest();
                oReq.open("GET", url, true);
                oReq.responseType = "arraybuffer";

                oReq.onload = function(e) {
                  var arraybuffer = oReq.response;

                  /* convert data to binary string */
                  var data = new Uint8Array(arraybuffer);
                  var arr = new Array();
                  for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                  var bstr = arr.join("");

                  /* Call XLSX */
                  var workbook = XLSX.read(bstr, {
                    type: "binary"
                  });

                  /* DO SOMETHING WITH workbook HERE */

                  function to_json(workbook) {
                    var result = {};
                    workbook.SheetNames.forEach(function(sheetName) {
                      var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                      if (roa.length > 0) {
                        result[sheetName] = roa;
                      }
                    });
                    console.log(result);


                    //////////// ARMAZENAR O ARQUIVO NO SCOPES
                    console.log("Leu o arquivo XLSX");
                    //dados = FormatarCsv.csvTojs(success);
                    Scopes.setArquivo(result);
                    console.log("Copiou o arquivo XLSX");
                    defer.resolve(success);


                    return result;
                  }
                  to_json(workbook);

                };
                oReq.send();



              }, function(error) {
                console.log('log: Não achou o arquivo .xlsx, vai procurar por outro');


                $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz Galvão/Lista_de_Bens.xls")
                  .then(function(success) {
                    console.log('log: Achou o arquivo .xls');


                    // //SÓ LÊ O ARQUIVO E COLOCA EM UMA VARIÁVEL
                    // $cordovaFile.readAsText(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xls")
                    //      .then(function (success) {



                    console.log('log: Vai pegar o .xls do SDCARD');
                    dir = "/storage/emulated/0/Queiroz Galvão/Lista_de_Bens.xls";

                    var url = dir;
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET", url, true);
                    oReq.responseType = "arraybuffer";

                    oReq.onload = function(e) {
                      var arraybuffer = oReq.response;

                      /* convert data to binary string */
                      var data = new Uint8Array(arraybuffer);
                      var arr = new Array();
                      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                      var bstr = arr.join("");

                      /* Call XLSX */
                      var workbook = XLS.read(bstr, {
                        type: "binary"
                      });

                      /* DO SOMETHING WITH workbook HERE */

                      function to_json(workbook) {
                        var result = {};
                        workbook.SheetNames.forEach(function(sheetName) {
                          var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                          if (roa.length > 0) {
                            result[sheetName] = roa;
                          }
                        });
                        console.log(result);


                        //////////// ARMAZENAR O ARQUIVO NO SCOPES
                        console.log("Leu o arquivo XLS");
                        //dados = FormatarCsv.csvTojs(success);
                        Scopes.setArquivo(result);
                        console.log("Copiou o arquivo XLX");
                        defer.resolve(success);


                        return result;
                      }
                      to_json(workbook);

                    };
                    oReq.send();





                    //  }, function (error) {
                    //
                    //    console.log ( "Não leu o arquivo XLS: " + error);
                    //    defer.reject(error);
                    //   //  defer.resolve(error);
                    //
                    //  });


                  }, function(error) {
                    Scopes.setArquivo("nd");
                    console.log('log: Não encontrou o arquivo .xls');
                    console.log('log: Não encontrou nenhum arquivo. Vai pegar o arquivo interno.' + error);
                    defer.resolve(error);

                  });

              });

          });


      }, function(error) { // Não achou o diretório

        console.log('log: Não encontrou o diretório. Vai pegar o arquivo interno.' + error);
        Scopes.setArquivo("nd");
        defer.resolve(error);

      });


    return defer.promise;
  };


});

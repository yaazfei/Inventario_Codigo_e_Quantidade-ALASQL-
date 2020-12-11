/**
 * Inventario Base
 * COM ALASQL
 * @author Yasmin de Lima Feitosa
 * @version 1.0
 */

 angular.module("starter").service('buscaArquivos', function($cordovaFile, Scopes, PopUps, $state, $q, FormatarCsv) {


  this.checarArquivo = function($cordovaFile, nomeArquivo) {
    var defer = $q.defer();
    filename = nomeArquivo  + ".csv";
    foldername = "Inventario Simples Nimal";


    $cordovaFile.checkDir(cordova.file.externalRootDirectory, foldername)
      .then(function(success) {
        console.log('log: Achou o diretorio');


        $cordovaFile.checkFile(cordova.file.externalRootDirectory, foldername + "/" + filename)
          .then(function(success) {
            console.log('log: Achou o arquivo .csv');


            //SÓ LÊ O ARQUIVO E COLOCA EM UMA VARIÁVEL
            $cordovaFile.readAsText(cordova.file.externalRootDirectory + foldername, filename)
              .then(function(success) {

                console.log("Leu o arquivo CSV");
                dados = FormatarCsv.csvTojs(success);
                dados2 = FormatarCsv.upperCaseKeys(dados); //Passar todos para Maíusculo antes
                // dados = FormatarCsv.csvJsonNoHeader(success);
                // dados = success;
                Scopes.setArquivo(dados2);
                console.log("Copiou o arquivo CSV");
                defer.resolve(success);

              }, function(error) {

                console.log("Não leu o arquivo CSV: " + error);
                defer.reject(error);
                //defer.resolve(error);

              });


          }, function(error) {
            console.log('log: Não achou o arquivo .csv, vai procurar por outro');

            filename = nomeArquivo  + ".xlsx";
            $cordovaFile.checkFile(cordova.file.externalRootDirectory, foldername + "/" + filename)
              .then(function(success) {
                console.log('log: Achou o arquivo .xlsx');

                PopUps.erroConsultar('<p align="center"> Foi encontrado um arquivo diferente na pasta interna.\n Por favor utilize somente arquivos .csv</p>');
                defer.resolve(success);

                //
                // console.log('log: Vai pegar o .xlsx do SDCARD');
                // // dir = "/storage/emulated/0/Queiroz Galvão/Lista_de_Bens.xlsx";
                // dir = "/storage/emulated/0/" + foldername + "/" + filename;
                //
                // var url = dir;
                // var oReq = new XMLHttpRequest();
                // oReq.open("GET", url, true);
                // oReq.responseType = "arraybuffer";
                //
                // oReq.onload = function(e) {
                //   var arraybuffer = oReq.response;
                //
                //   /* convert data to binary string */
                //   var data = new Uint8Array(arraybuffer);
                //   var arr = new Array();
                //   for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                //   var bstr = arr.join("");
                //
                //   /* Call XLSX */
                //   var workbook = XLSX.read(bstr, {
                //     type: "binary"
                //   });
                //
                //   /* DO SOMETHING WITH workbook HERE */
                //
                //   function to_json(workbook) {
                //     var result = {};
                //     workbook.SheetNames.forEach(function(sheetName) {
                //       var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                //       if (roa.length > 0) {
                //         result[sheetName] = roa;
                //       }
                //
                //       //////////// ARMAZENAR O ARQUIVO NO SCOPES
                //       console.log("Leu o arquivo XLSX");
                //       //dados = FormatarCsv.csvTojs(success);
                //       dados2 = FormatarCsv.upperCaseKeys(roa); //Passar todos para Maíusculo antes
                //       Scopes.setArquivo(dados2);
                //
                //       //Scopes.setArquivo(roa);
                //       Scopes.setArquivoXLSX(result);
                //       console.log("Copiou o arquivo XLSX");
                //       defer.resolve(success);
                //
                //     });
                //     console.log(result);
                //     return result;
                //   }
                //   to_json(workbook);
                //
                // };
                // oReq.send();
                //


              }, function(error) {
                console.log('log: Não achou o arquivo .xlsx, vai procurar por outro');


                filename = nomeArquivo  + ".xls";
                $cordovaFile.checkFile(cordova.file.externalRootDirectory, foldername + "/" + filename)
                  .then(function(success) {
                    console.log('log: Achou o arquivo .xls');

                    PopUps.erroConsultar('<p align="center"> Foi encontrado um arquivo diferente na pasta interna.\n Por favor utilize somente arquivos .csv</p>');
                    defer.resolve(success);

            //         console.log('log: Vai pegar o .xls do SDCARD');
            //         // dir = "/storage/emulated/0/Queiroz Galvão/Lista_de_Bens.xlsx";
            //         dir = "/storage/emulated/0/" + foldername + "/" + filename;
            //
            //         var url = dir;
            //         var oReq = new XMLHttpRequest();
            //         oReq.open("GET", url, true);
            //         oReq.responseType = "arraybuffer";
            //
            //         oReq.onload = function(e) {
            //           var arraybuffer = oReq.response;
            //
            //           /* convert data to binary string */
            //           var data = new Uint8Array(arraybuffer);
            //           var arr = new Array();
            //           for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            //           var bstr = arr.join("");
            //
            //           /* Call XLSX */
            //           var workbook = XLS.read(bstr, {
            //             type: "binary"
            //           });
            //
            //           /* DO SOMETHING WITH workbook HERE */
            //
            //           function to_json(workbook) {
            //             var result = {};
            //             workbook.SheetNames.forEach(function(sheetName) {
            //               var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            //               if (roa.length > 0) {
            //                 result[sheetName] = roa;
            //               }
            //
            //
            //               //////////// ARMAZENAR O ARQUIVO NO SCOPES (e um em modo XLSX)
            //               console.log("Leu o arquivo XLS");
            //               //dados = FormatarCsv.csvTojs(success);
            //               dados2 = FormatarCsv.upperCaseKeys(roa); //Passar todos para Maíusculo antes
            //               Scopes.setArquivo(dados2);
            //
            //               //Scopes.setArquivo(roa);
            //               Scopes.setArquivoXLSX(result);
            //               console.log("Copiou o arquivo XLX");
            //               defer.resolve(success);
            //             });
            //
            //             return result;
            //           }
            //           to_json(workbook);
            //
            //         };
            //         oReq.send();
            //
            //
            //
                  }, function(error) {
                    Scopes.setArquivo("nd");
                    console.log('log: Não encontrou o arquivo .xls');
                    console.log('log: Não encontrou nenhum arquivo. Vai fazer do zero:' + error);
                    defer.resolve(error);
                  });

            });
            });

      }, function(error) { // Não achou o diretório

        console.log('log: Não encontrou o arquivo para buscar. Vai fazer do zero: ' + error);
        Scopes.setArquivo("nd");
        defer.resolve(error);
      });

    return defer.promise;

};
});

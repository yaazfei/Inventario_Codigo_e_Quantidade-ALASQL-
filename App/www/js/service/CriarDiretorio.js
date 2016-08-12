angular.module("starter").service('CriarDiretorio', function($cordovaFile, FormatarCsv, PopUps, $state) {


/*/************************************************************************************************************/
 //// B1 METHOD


  this.processar = function ($cordovaFile, dados){
  //alert("Entrou no processar");

      console.log(dados);
      // var dados1 = FormatarCsv.iterateObject(dados);
      //console.log(dados1);

      $cordovaFile.createDir(cordova.file.externalRootDirectory, "Queiroz Galvão", false)
          .then(function(success) {

                          console.log('log: Criou diretorio vazio');
                          //alert("Criou o diretorio");

                          // $cordovaFile.createFile(cordova.file.externalRootDirectory+"Queiroz Galvão", "Lista_de_Bens.xlsx", true)
                          // .then(function(success) {
                          //              console.log('log: Sobreescreveu com um arquivo vazio');
                          //              //alert("Criou o Arquivo");

                                      // alasql.promisse('SELECT * INTO XLSX("Lista_de_Bens.xlsx",{headers:true}) FROM ?',[dados])
                                      $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv" , (dados), true)

                                      // $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv" , (dados), true)
                                      .then(function(success) {


                                                    console.log('log: Escreveu no arquivo vazio');
                                                    PopUps.produtoSalvo('Bem salvo com sucesso!');
                                                    $state.go('app.consultarProduto');
                                                    //alert("Criou o Arquivo");


                                      }, function(error) {

                                        console.log('log: Não conseguiu escrever no arquivo');
                                        //alert("Não conseguiu escrever no arquivo existente");
                                        PopUps.erroEscrever();




                                                //   console.log('log: Não conseguiu escrever no arquivo');
                                                //   //alert("Não conseguiu escrever no Arquivo");
                                                //   $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xlsx" , (dados), false)
                                                //  .then(function(success) {
                                                 //
                                                //             console.log('log: Escreveu no arquivo existente');
                                                //             //alert("Escreveu no arquivo existente");
                                                 //
                                                //   }, function(error) {
                                                 //
                                                //                 console.log('log: nao conseguiu escrever no arquivo existente');
                                                //                 //alert("Não conseguiu escrever no arquivo existente");
                                                //                 PopUps.erroEscrever();
                                                //   });







                                                  });

                          // }, function(error) {
                          //
                          //             console.log('log: Não conseguiu criar o arquivo');
                          //             //alert("Pasta já existe");
                          //             PopUps.erroEscrever();



                                    //    $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xlsx" , (dados), false)
                                    //  .then(function(success) {
                                     //
                                    //                 console.log('log: Escreveu no arquivo criado');
                                    //                 //alert("Escreveu o header no arquivo");
                                     //
                                     //
                                    //   }, function(error) {
                                     //
                                    //               console.log('log: Não conseguiu escrever no arquivo');
                                    //               //alert("Não conseguiu criar o Arquivo");
                                     //
                                    //               $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xlsx" , (dados), false)
                                    //              .then(function(success) {
                                     //
                                    //                         console.log('log: Escreveu no arquivo existente');
                                    //                         //alert("Escreveu no arquivo existente");
                                    //                         PopUps.produtoSalvo();
                                    //                         var message = "O Produto '" + dados.codigo + "' foi salvo com sucesso!";
                                    //                         Scopes.setItem(message);
                                     //
                                     //
                                    //               }, function(error) {
                                    //                             console.log('log: nao conseguiu escrever no arquivo existente');
                                    //                             //alert("Não conseguiu escrever no arquivo existente");
                                    //                             PopUps.erroEscrever();
                                     //
                                    //               });








                                      // });
                          // });


          }, function(error) {

                         console.log('log: Não criou o diretorio');
                         //alert("Não criou o diretorio");


                          // $cordovaFile.createFile(cordova.file.externalRootDirectory+"Queiroz Galvão", "Lista_de_Bens.xlsx", true)
                          // .then(function(success) {
                          //
                          //             console.log('log: Sobreescreveu com um arquivo vazio');
                          //           //  alert("Criou o Arquivo");

                                      $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.csv" , (dados), true)
                                     .then(function(success) {

                                       console.log('log: Escreveu no arquivo vazio');
                                       PopUps.produtoSalvo('Bem salvo com sucesso!');
                                       $state.go('app.consultarProduto');

                                      }, function(error) {

                                                  console.log('log: Não escreveu no arquivo criado');
                                                  PopUps.erroEscrever();

                                                //   $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "Inventario", "Inventario.csv" , (dados.codigo + "; " + dados.quantidade + '\n'), false)
                                                //  .then(function(success) {
                                                 //
                                                //            console.log('log: escreveu no arquivo existente');
                                                //           // alert("Escreveu no arquivo existente");
                                                //            PopUps.produtoSalvo();
                                                //            var message = "O Produto '" + dados.codigo + "' foi salvo com sucesso!";
                                                //            Scopes.setItem(message);
                                                 //
                                                //   }, function(error) {
                                                 //
                                                //             console.log('log: nao conseguiu escrever no arquivo existente');
                                                //             //alert("Não conseguiu escrever no arquivo existente");
                                                //             PopUps.erroEscrever();
                                                //   });













                                                  });

                          // }, function(error) {
                          //
                          //             console.log('log: Não criou o arquivo');
                          //             $cordovaFile.writeFile(cordova.file.externalRootDirectory + "Queiroz Galvão", "Lista_de_Bens.xlsx" , (dados), false)
                          //            .then(function(success) {
                          //
                          //                      console.log('log: Escreveu no arquivo');
                          //                     // alert("Escreveu o header no arquivo");
                          //
                          //             }, function(error) {
                          //
                          //
                          //
                          //
                          //
                          //
                          //
                          //                         console.log('log:nao escreveu cabecalho no arquivo');
                          //                       //  alert("Não escreveu o header no arquivo");
                          //
                          //                         $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "Inventario", "Inventario.csv" , (dados.codigo + "; " + dados.quantidade + '\n'), false)
                          //                        .then(function(success) {
                          //
                          //                                 console.log('log: escreveu no arquivo existente');
                          //                               //  alert("Escreveu no arquivo existente");
                          //                                 PopUps.produtoSalvo();
                          //                                 var message = "O Produto '" + dados.codigo + "' foi salvo com sucesso!";
                          //                                 Scopes.setItem(message);
                          //
                          //                         }, function(error) {
                          //
                          //                                  console.log('log: nao conseguiu escrever no arquivo existente');
                          //                                  //alert("Não conseguiu escrever no arquivo existente");
                          //                                  PopUps.erroEscrever();
                          //
                          //                         });












                                                  // });
                          // });

          });

  };

  /*/************************************************************************************************************/


















  // /*/************************************************************************************************************/
  // //// CRIAR ARQUIVO E PASTA ADAPTADOS
  //
  // criarArquivo = function($cordovaFile, dados) {
  //
  //   console.log('Header: ' + results.header);
  //   $cordovaFile.writeFile(cordova.file.externalRootDirectory + "L2R", "Lista_de_Bens.xlsx", (dados), false)
  //     .then(function(success) {
  //
  //       alert("Criou o novo arquivo com o header");
  //       //console.log('Criou o novo arquivo com o header');
  //
  //     }, function(error) {
  //
  //       alert("Arquivo já existe dentro da pasta.");
  //       //  console.log('Arquivo já existe dentro da pasta.');
  //
  //     });
  // };
  //
  //
  //
  //
  // this.criarPasta = function($cordovaFile, dados) {
  //   // if($cordovaFile != null)
  //
  //   console.log('Entrou no Criar Pasta');
  //   alert("Entrou no Criar Pasta");
  //
  //
  //   if ($cordovaFile !== undefined || $cordovaFile !== null) {
  //     $cordovaFile.createDir(cordova.file.externalRootDirectory, "Queiroz Galvão", true)
  //       .then(function(success) {
  //         this.criarArquivo($cordovaFile, dados);
  //         alert("Criou a pasta e o arquivo");
  //
  //
  //       }, function(error) {
  //
  //         PopUps.erroCriarPasta();
  //         alert("Não criou a pasta");
  //
  //
  //       });
  //   }
  //
  //   console.log('Fim do Gravar Pasta');
  //   // console.log('Dados: ' + $scope.dados);
  //
  // };
  //
  //
  //
  // /*/************************************************************************************************************/
  //
  //
  // // Checando se o arquivo existe
  //
  // this.checarDiretorio = function($cordovaFile, dados) {
  //
  //   alert("Entrou no ChecarDiretorio");
  //   $cordovaFile.checkDir(cordova.file.externalRootDirectory, "Queiroz Galvão")
  //     .then(function(sucess) {
  //       // Encontra a pasta
  //       this.checarArquivo($cordovaFile, dados);
  //       alert("Encontrou a pasta com o checkDir");
  //
  //
  //     }, function(error) {
  //       // Não encontra a pasta
  //       alert("Não encontrou a pasta com o checkDir");
  //       this.criarPasta($cordovaFile, dados);
  //       alert("Criou a pasta");
  //     });
  //
  //   alert("Terminou o checkDir");
  //
  //
  // };
  //
  //
  //
  // checarArquivo = function($cordovaFile, dados) {
  //
  //   //Checando se há arquivo dentro da pasta
  //   $cordovaFile.checkFile(cordova.file.externalRootDirectory, "Queiroz Galvão/Lista_de_Bens.xlsx")
  //     .then(function(sucess) { // Encontrou
  //
  //       // se encontrar o arquivo:
  //       alert("Encontrou o arquivo então não criou um novo.");
  //
  //     }, function(error) { //Não encontrou
  //
  //       // se não encontrar o arquivo:
  //       this.criarArquivo($cordovaFile, dados);
  //       alert("Não encontrou o arquivo, então criou um novo.");
  //     });
  // };



  /*/************************************************************************************************************/





});

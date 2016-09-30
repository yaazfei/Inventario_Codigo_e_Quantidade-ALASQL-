angular.module('starter').controller('consultarProdutoCtrl', function($scope, $window, $state, $cordovaFile, $stateParams, $ionicPopup, $timeout, $http, $location, Scopes, PopUps, CriarDiretorio, buscaArquivos, FormatarCsv) {

  console.log('Entrou no controller de Consultar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');

  $scope.dados = Scopes.getLocal();
  console.log($scope.dados);

  $scope.fecharApp = function() {
    console.log('Apertou o fechar');
    PopUps.showConfirm();
  };

  $scope.zerarVar = function() {
    console.log('Entrou no zeraVar');

    //// Para zerar o local se tiver voltado do EditarProduto
    local = undefined;
    $scope.local = undefined;
    $scope.bemEncontrado = undefined;
  };


  $scope.primeiroBem = function(dados) {
    bem = $scope.primBem;
    $scope.editarBem(bem, dados);

  };



  $scope.form = {};
  $scope.produto = {};

  $scope.setForm = function(form) {
    // console.log(" Entrou no setForm ******************************");

    $scope.form.NovoProduto = form;
    $scope.form.Master = form;
    console.log($scope.form.NovoProduto);
  };


  $scope.deixarPristine = function() {

    console.log("Entrou no Pristine");

    document.getElementById("form.BuscaBem").reset();
    document.getElementById("f_1").value = "";
    $scope.Bem = undefined;
    Bem = undefined;

    $scope.form.BuscaBem = $scope.form.Master;
    $scope.form.BuscaBem.$setPristine();

    setTimeout(function() {
      document.getElementById("f_1").focus();
      console.log("entrou no setTimeout");
    }, 100);

  };





  /////////////////////////////
  ////// ESCOLHER UM BEM /////
  ////////////////////////////

  $scope.editarBem = function(bem, dados) {
    // alert('Entrou no editarBem');

    if (bem.COD_LOCAL !== undefined && bem.COD_LOCAL === dados.COD_LOCAL) {
      ////Faz nada se o local não for encontrado, só cai no catch (Gambi)
    } else {
      console.log('Entrou no editarBem, vai fazer o alaSQL');
      // var dir = "files/Lista_de_Locais.xlsx";
      var arquivoLocais = Scopes.getArquivoLocais();



      alasql.promise('SELECT DESC_LOCAL FROM ? \ WHERE COD_LOCAL == ?', [arquivoLocais, bem.COD_LOCAL])
        .then(function(res) {

          console.log("Antes: " + JSON.stringify(res));
          res = FormatarCsv.toString(res); // Verificar se existem line breaks antes de ler suas propriedades
          console.log("Depois: " + JSON.stringify(res));



          // ACHOU O LOCAL E PEGOU O PRIMEIRO
          console.log('Encontrou o local com o alaSQL');
          console.log('Resultado do ALQSQL: ' + res[0]);
          dados.DESC_LOCAL_DO_BEM = res[0].DESC_LOCAL;

          Scopes.setLocal(dados);
          Scopes.setBem(bem);
          console.log('Local: ' + dados);

          document.getElementById("form.BuscaBem").reset();
          document.getElementById("f_1").value = "";
          $scope.form.BuscaBem = $scope.form.Master;
          $scope.form.BuscaBem.$setPristine();

          $state.go('app.editarProduto');

        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          console.log("COD_LOCAL do BEM não estava cadastrado! Gambi on try/cath");
          dados.DESC_LOCAL_DO_BEM = "LOCAL NÃO CADASTRADO";
          Scopes.setLocal(dados);
          Scopes.setBem(bem);
          console.log('Local: ' + dados);
          console.log('Bem: ' + bem);

          document.getElementById("form.BuscaBem").reset();
          document.getElementById("f_1").value = "";
          $scope.form.BuscaBem = $scope.form.Master;
          $scope.form.BuscaBem.$setPristine();

          $state.go('app.editarProduto');

        });

    }
  };


  ///////////////////////////////////////
  ////// BUSCAR UM BEM PELA CHAPA //////
  /////////////////////////////////////

  $scope.buscaBem = function(bem) {

    ////// WITH GAMBI
    if (bem === undefined || bem.CHAPA === "" || bem.CHAPA === undefined ||
      $scope.form.BuscaBem.$pristine || $scope.form.BuscaBem.chapaBem.$pristine) {
      PopUps.erroConsultar("Insira os dados corretamente!");

    } else {


      var arquivoBens = Scopes.getArquivo();

      // alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA == ?', [arquivoBens, bem.CHAPA])
      alasql.promise('SELECT * FROM ? \ WHERE CHAPA == ?', [arquivoBens, bem.CHAPA])
        .then(function(res1) {

          console.log('Resultados encontrados: ' + res1.length);


          console.log("Antes: " + JSON.stringify(res1));
          res1 = FormatarCsv.toString(res1); // Verificar se existem line breaks antes de ler suas propriedades
          console.log("Depois: " + JSON.stringify(res1));



          if (res1.length < 1) {
            PopUps.erroConsultar("Bem não encontrado!");
          } else {

            $scope.bemEncontrado = res1;
            console.log('Bem foi encontrado.');
            //console.log(res1);
            console.log(res1[0].COD_BEM, res1[0].CHAPA, res1[0].COD_LOCAL, res1[0].DESC_BEM);
            $scope.primBem = res1[0];


            //Resetar o campoe deixa-lo pristine
            document.getElementById("form.BuscaBem").reset();
            document.getElementById("f_1").value = "";
            $scope.form.BuscaBem = $scope.form.Master;
            $scope.form.BuscaBem.$setPristine();

            setTimeout(function() {
              //Tirar o focus do campo e passar pro div próximo as respostas
              //document.activeElement.blur();
              document.getElementById("f_1").blur();
              $window.document.getElementById("rep_1").focus();



              var myElement = document.getElementById('rep_1');
              var topPos = myElement.offsetTop;


              // var target = document.getElementById("rep_1");
              // target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;


              // document.getElementById("rep_1").scrollIntoView();
              // $scope.teste1("rep_1");

            }, 100);

            // $scope.deixarPristine();

          }
          //Para atualizar a lista
          $scope.$apply(function() {
            $scope.bemEncontrado = res1;
            $scope.primBem = res1[0];
          });


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Bem não encontrado!");

        });

    }
  };




  $scope.teste1 = function(element) {

    // window.scroll(0,findPos(document.getElementById(element)));
    //
    // //Finds y value of given object
    // function findPos(obj) {
    //     var curtop = 0;
    //     if (obj.offsetParent) {
    //         do {
    //             curtop += obj.offsetTop;
    //         } while (obj == obj.offsetParent);
    //     return [curtop];
    //     }
    // }

  };




  // console.log("Passou uma vez. Esperando o alaSQL. ");

});

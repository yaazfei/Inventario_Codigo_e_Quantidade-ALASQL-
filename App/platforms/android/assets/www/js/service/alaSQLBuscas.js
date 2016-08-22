angular.module("starter").service('alaSQLBuscas', function($cordovaFile, Scopes, PopUps, $state, $timeout) {



this.buscarXLSX = function(){
setTimeout(function(){

  ////*************************************************************************////
                  // dir = "files/Lista_de_Bens.csv";
                  // dir = "file:///data/data/com.ionicframework.myaoo100386/files/Lista_de_Bens.csv";
                  dir = "files/Lista_de_Bens.xlsx";
                  alasql.promise('SELECT * FROM XLSX(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
                    .then(function(res) {

                      //ACHOU O LOCAL E PEGOU O PRIMEIRO
                      console.log('Resultado do ALQSQL: ' + res[0]);
                      $this.bemEncontrado = res;
                      console.log('Bem foi encontrado.');

                      //Para atualizar a lista
                      $this.$apply(function() {
                        $this.bemEncontrado = res;
                      });

                      // $state.go('app.consultarProdutoCtrl');
                      // $scope.$broadcast('scroll.refreshComplete');

                    }).catch(function(err) { // NÃO ENCONTROU O LOCAL

                      PopUps.erroConsultar("Bem não encontrado!");
                    });


  ////*************************************************************************////

}, 3000);
};



this.buscarCSV = function(){
setTimeout(function(){

  ////*************************************************************************////
                  // dir = "files/Lista_de_Bens.csv";
                  dir = "/Android/data/com.ionicframework.myaoo100386/Lista_de_Bens.csv";
                  //dir = "files/Lista_de_Bens.xlsx";

                  alasql.promise('SELECT * FROM CSV(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
                    .then(function(res) {

                      //ACHOU O LOCAL E PEGOU O PRIMEIRO
                      console.log('Resultado do ALQSQL: ' + res[0]);
                      $this.bemEncontrado = res;
                      console.log('Bem foi encontrado.');

                      //Para atualizar a lista
                      $this.$apply(function() {
                        $this.bemEncontrado = res;
                      });

                      // $state.go('app.consultarProdutoCtrl');
                      // $scope.$broadcast('scroll.refreshComplete');

                    }).catch(function(err) { // NÃO ENCONTROU O LOCAL

                      PopUps.erroConsultar("Bem não encontrado!");
                    });


  ////*************************************************************************////

}, 3000);
};






























});

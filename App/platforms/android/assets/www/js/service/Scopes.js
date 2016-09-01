angular.module("starter").service('Scopes', function() {

  var localSelecionado;
  var bemSelecionado;


  return {
    getLocal: function() {
      return localSelecionado;
    },
    setLocal: function(value) {
      localSelecionado = value;
    },
    getBem: function() {
      return bemSelecionado;
    },
    setBem: function(value) {
      bemSelecionado = value;
    },
    getArquivo: function() {
      return arquivoSelecionado;
    },
    setArquivo: function(value) {
      arquivoSelecionado = value;
    },
    getArquivoLocais: function() {
      return arquivoSelecionadoLocais;
    },
    setArquivoLocais: function(value) {
      arquivoSelecionadoLocais = value;
    },

    blankItem: function($scope) {
      console.log("Entrou no zerarVariáveis");
      var local = "";
      var bem = "";

      if (local !== undefined || local !== "") {
        local = null;
      }
      if ($scope.local !== undefined || $scope.local !== "") {
        $scope.local = null;
      }
      if (bem !== undefined || bem !== "") {
        bem = null;
      }
      if ($scope.bem !== undefined || $scope.bem !== "") {
        $scope.bem = null;
      }

      //alert("Zerou as variáveis");
      console.log("Zerou as variáveis");
    }
  };
});

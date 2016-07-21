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
    blankItem: function($scope) {
      console.log("Entrou no zerarVariáveis");

      $scope.local = null;
      $scope.bem = null;

      local = null;
      bem = null;
      localSelecionado = null;
      bemSelecionado = null;
      alert("Zerou as variáveis");
    }
  };
});

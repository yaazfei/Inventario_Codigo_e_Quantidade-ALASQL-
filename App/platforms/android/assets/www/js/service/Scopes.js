angular.module("starter").service('Scopes', function() {

  var ItemSelecionado;

  return {
    getItem: function() {
      return ItemSelecionado;
    },
    setItem: function(value) {
      ItemSelecionado = value;
    },
    blankItem: function($scope) {
      console.log("Entrou no zerarVariáveis");

      $scope.veiculoNOK = null;
      $scope.veiculo = null;

      veiculoNOK = null;
      veiculo = null;
      veiculoEdit = null;
      ItemSelecionado = null;
      alert("Zerou as variáveis");
    }
  };
});

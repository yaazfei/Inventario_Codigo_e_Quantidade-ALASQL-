/**
 * Inventario Base
 * COM ALASQL
 * @author Yasmin de Lima Feitosa
 * @version 1.0
 */

angular.module("starter").service('Scopes', function() {

  var ItemSelecionado;
  var arquivoSelecionado;
  var message;

  return {
    getItem: function() {
      return ItemSelecionado;
    },
    setItem: function(value) {
      ItemSelecionado = value;
    },

    getMessage: function() {
      return message;
    },
    setMessage: function(value) {
      message = value;
    },
    getArquivo: function() {
      return arquivoSelecionado;
    },
    setArquivo: function(value) {
      arquivoSelecionado = value;
    },

    /////////////////////////////////////////////////////

    blankItem: function($scope) {
      console.log("Entrou no zerarVariáveis");
    }
  };
});

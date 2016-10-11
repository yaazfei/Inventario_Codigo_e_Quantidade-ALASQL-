angular.module("starter").service('Scopes', function() {

  var localSelecionado;
  var bemSelecionado;
  var arquivoSelecionado;
  var arquivoSelecionadoLocais;
  var message;



  return {

    getMessage: function() {
      return message;
    },
    setMessage: function(value) {
      message = value;
    },

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


    ///////   Salvando os arquivos em formato xlsx  (Para o futuro)//////

    getArquivoXLSX: function() {
      return arquivoSelecionadoXLSX;
    },
    setArquivoXLSX: function(xlsxFormat) {
      arquivoSelecionadoXLSX = xlsxFormat;
    },
    getArquivoLocaisXLSX: function() {
      return arquivoSelecionadoLocaisXLSX;
    },
    setArquivoLocaisXLSX: function(xlsxFormat) {
      arquivoSelecionadoLocaisXLSX = xlsxFormat;
    },

    /////////////////////////////////////////////////////

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

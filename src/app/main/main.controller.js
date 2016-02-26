(function() {
  'use strict';

  angular
    .module('levelUpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;
    vm.test = "Hellow World";
    
    vm.header = "Todo List";
    vm.newTodo = null;
  }
})();

(function () {
  'use strict';

  angular
    .module('levelUpAngular')
    .controller('MainController', MainController);


  function MainController($scope, $filter) {
    var vm = this;

    vm.items = [
      {
        name: "First",
        completed: true,
        id: 0,
        praice: 10
      },
      {
        name: "Second",
        completed: false,
        id: 1,
        price: 20
      }
    ];
    vm.statusFilter = {};
    vm.newTodo = null;
    vm.date = Date.now();
    vm.status = '';

    $scope.$watch(function () {
      return vm.items;
    }, function () {
      vm.remainingCount = $filter('filter')(vm.items, { completed: false }).length;
      vm.completedCount = vm.items.length - vm.remainingCount;
      vm.allCompleted = !vm.remainingCount;
    }, true);


    vm.addItem = function () {
      var model = {
        name: vm.newTodo,
        completed: false,
        id: generateId()
      };

      vm.items.push(model);
      vm.newTodo = null;
    };

    vm.deleteItem = function (item) {
      vm.items.splice(vm.items.indexOf(item), 1);
    };

    vm.toggleCompleted = function () {
      vm.remainingCount = toCountComleted();
    };

    vm.changeFilter = function (filter) {//active, completed, ili pusto
      vm.status = filter;

      vm.statusFilter = (vm.status === 'active')
        ? { completed: false }
        : (vm.status === 'completed')
        ? { completed: true }
        : {};
    };

    vm.markAll = function (completed) {
      completed = !completed;
      vm.items.forEach(function (item) {
        if (item.completed !== completed) {
          item.completed = completed;

        }
        vm.toggleCompleted();
      });
    };

    vm.clearCompleted = function () {
      vm.items = vm.items.filter(function (item) {
        return !item.completed;
      })
    };

    function generateId() {
      return Math.floor((1 + Math.random()) * 0x10000);
    }

    function toCountComleted () {
     return $filter('filter')(vm.items, { completed: false }).length;
    }
  }
})();

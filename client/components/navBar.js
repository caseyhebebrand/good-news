angular.module('app')
  .component('navBar', {
    bindings: {
      onClick: '<',
      set: '<',
      recent: '<'
    },

    templateUrl: '/templates/navBar.html'
  });

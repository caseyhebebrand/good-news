angular.module('app')
  .controller('SearchCtrl', function() {
    this.query = '';
    this.handleClick = function() {
      this.search(this.query, this.set)
    }
  })
  .component('search', {
    bindings: {
      set: '<',
      search: '<'
    },
    controller: 'SearchCtrl',
    templateUrl: '/templates/search.html'
  })

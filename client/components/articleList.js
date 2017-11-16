angular.module('app')
  .component('articleList', {
    bindings: {
      articles: '<',
      onView: '<'
    },

    templateUrl: '/templates/articleList.html'
  })

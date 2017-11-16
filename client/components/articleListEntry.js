angular.module('app')
  .component('articleListEntry', {
    bindings: {
      article: '<',
      onView: '<'
    },

    templateUrl: "/templates/articleListEntry.html"
  })

angular.module('app')
  .controller('AppCtrl', function($http) {
    //this.articles = [];

    this.setArticles = (data) => {
      this.articles = data;
    };

    this.onSearch = (query, cb) => {
      console.log('searching for this:', query)
      $http({
        method: 'POST',
        url: '/search',
        headers: {
         'Content-Type': 'application/json'
        },
        data: JSON.stringify({query: query})
      }).then(function successCb(stories) {
        console.log(stories)
        cb(stories.data);
      }, function errorCb(response) {
        console.log(response);
      });
    }

    this.onClick = function(cb) {
      console.log('clicked on favorites button');
      $http({
        method: 'GET',
        url: '/favorites'
      }).then(function successCb(results) {
        console.log('success on get from client to server', results);
        cb(results.data)
      }, function errorCb(response) {
        console.log(response);
      });
    };

    this.onView = (article) => {
      console.log('clicked on title', article)
      $http({
        method: 'POST',
        url: '/views',
        headers: {
         'Content-Type': 'application/json'
        },
        data: article
      }).then(function successCb(results) {
        console.log('success on get from db', results.data);
      }, function errorCb(response) {
        console.log(response);
      });
    };

    this.render = function(cb) {
      $http({
        method: 'GET',
        url: '/recent'
      }).then(function successCb(stories) {
        //console.log('success on get from client to server');
        cb(stories.data);
      }, function errorCb(response) {
        console.log(response);
      });

    };

    this.render(this.setArticles);
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html'
  })

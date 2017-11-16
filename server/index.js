// index for server
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var config = require('../config.js')
var app = express();
var AylienNewsApi = require('aylien-news-api');
var apiInstance = new AylienNewsApi.DefaultApi();


app.use(bodyParser.json());
// start server
app.listen(3000, () => {
  console.log('Listening on port 3000!');
})

// angular
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/recent', (req, res) => {
  console.log('successful get to server')
  // Configure API key authorization: app_id
  var app_id = apiInstance.apiClient.authentications['app_id'];
  app_id.apiKey = config.APP_ID;

  // Configure API key authorization: app_key
  var app_key = apiInstance.apiClient.authentications['app_key'];
  app_key.apiKey = config.API_KEY;

  var opts = {
    'language': ['en'],
    'publishedAtStart': 'NOW-1DAY',
    'publishedAtEnd': 'NOW',
    'sentimentTitlePolarity': "positive",
    'notSentimentTitlePolarity': "negative",
    'sentimentBodyPolarity': "positive",
    'notSentimentBodyPolarity': "negative",
    'mediaImagesCountMin': 1,
    'sortBy': "published_at",
    'sortDirection': "desc"
  };

  var callback = function(error, data, response) {
    if (error) {
      console.error(error);f
    } else {
      console.log('API called successfully. Returned data: ');
      console.log('========================================');
      // for (var i = 0; i < data.stories.length; i++){
      //   console.log(data.stories[i].title + " / " + data.stories[i].source.name);
      // }
      res.send(data.stories);
    }
  };

  apiInstance.listStories(opts, callback);
});

app.post('/views', (req, res) => {
  var article = req.body;
  var options = {id: article.id}
  db.find(options)
    .then(data => {
      if (data.length === 0) {
        throw data;
      }
      return db.updateViews(options)
    })
    .catch(data => {
      db.save({id: article.id, title: article.title, links: article.links, summary: article.summary, media: article.media, views: 1})
    })
});

app.get('/favorites', (req, res) => {
  db.findAll()
    .then(data => {
      console.log('found all favorites')
      res.send(data)
    })
    .catch(err => {
      console.log('error')
    })
});

app.post('/search', (req, res) => {
  console.log('in server search with query', req.body)
  var query = req.body.query;
  var app_id = apiInstance.apiClient.authentications['app_id'];
  app_id.apiKey = config.APP_ID;

  // Configure API key authorization: app_key
  var app_key = apiInstance.apiClient.authentications['app_key'];
  app_key.apiKey = config.API_KEY;

  var opts = {
    'text': query,
    'language': ['en'],
    'publishedAtStart': 'NOW-1DAY',
    'publishedAtEnd': 'NOW',
    'sentimentBodyPolarity': "positive",
    'notSentimentBodyPolarity': "negative",
    'mediaImagesCountMin': 1,
    'sortBy': "published_at",
    'sortDirection': "desc"
  };

  var callback = function(error, data, response) {
    if (error) {
      console.error(error);f
    } else {
      console.log('API called successfully. Returned data: ');
      console.log('========================================');
      // for (var i = 0; i < data.stories.length; i++){
      //   console.log(data.stories[i].title + " / " + data.stories[i].source.name);
      // }
      console.log(data.stories);
      res.send(data.stories);
    }
  }

  apiInstance.listStories(opts, callback);
});

var AylienNewsApi = require('aylien-news-api');

var apiInstance = new AylienNewsApi.DefaultApi();

// Configure API key authorization: app_id
var app_id = apiInstance.apiClient.authentications['app_id'];
app_id.apiKey = "05e0418b";

// Configure API key authorization: app_key
var app_key = apiInstance.apiClient.authentications['app_key'];
app_key.apiKey = "b7f1027543f428a7b6d8853b07da1b76";

var opts = {
  'language': ['en'],
  'publishedAtStart': 'NOW-1DAY',
  'publishedAtEnd': 'NOW',
  'sentimentTitlePolarity': "positive",
  'notSentimentTitlePolarity': "negative",
  'sentimentBodyPolarity': "positive",
  'notSentimentBodyPolarity': "negative",
  'sortBy': "published_at",
  'sortDirection': "desc"
};


var callback = function(error, data, response) {
  if (error) {
    console.error(error);f
  } else {
    console.log('API called successfully. Returned data: ');
    console.log('========================================');
    for (var i = 0; i < data.stories.length; i++){
      console.log(data.stories[i].title + " / " + data.stories[i].source.name);
    }
  }
};
var getArticles = apiInstance.listStories(opts, callback);

require('angular');
require('angular-route');

(function() {
  var app = angular.module('blog',[]);
  var post;
  var posts = [];
  var data;
  var part1 = '9e036a59681409c5f542';
  var part2 = '72e86d69d37a005ad650';

  app.service('dataService', function($http) {
  delete $http.defaults.headers.common['X-Requested-With'];
  this.getData = function() {
      return $http({
          method: 'GET',
          url: 'https://api.github.com/users/mollyfish/gists',
          params: 'limit=10, sort_by=created:desc',
          headers: {'Authorization': 'token '+ part1 + part2}
      }).then(function(resp, err) {
        return resp.data;
      });
    }
  });

  app.controller('GistController', function($scope, dataService) {
    dataService.getData().then(function(dataResponse) {
      var data = dataResponse;
      for (var i = 0; i < data.length; i++) {
        post = {};
        post.description = data[i].description;
        post.date = data[i].updated_at;
        post.author = data[i].owner.login;
        for (file in data[i].files) {
          post.title = data[i].files[file].filename;
        }
        posts.push(post);
      }
      console.dir(posts);
      return(data);
    });
    this.info = posts;
  });
})();

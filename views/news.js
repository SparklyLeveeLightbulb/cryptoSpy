const briefings = angular.module('login')


briefings.factory('briefingsFactory', ($http) => ({
  init: (callback) => {
    //http call to get articles 
    $http({
      method: 'GET',
      url: '/getnews'
    }).then(function successCallback(response) {
      callback(response.data)
    }, function errorCallback(response) {
      console.log(response)
    })
}
}));





briefings.controller('briefingsCtrl', ($scope, briefingsFactory) => {
  $scope.articles;
  $scope.getArticles = () => {
    briefingsFactory.init((response)=> {
      $scope.articles = response
    })
  }
});
const briefings = angular.module('login')


briefings.factory('briefingsFactory', ($http) => ({
  init: (callback) => {
    //updates user table
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
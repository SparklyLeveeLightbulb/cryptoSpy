const app = angular.module('login')
app.component('cryptoProfile', {
  templateUrl: 'profile.html',
  bindings: {
   
  }
});

app.factory('appFactory', ($http) => ({
  getOnInit: (callback) => {
  $http({
  method: 'GET',
    url: '/getProfile'
  }).then(function successCallback(response) {
    console.log(response)
    callback(response.data)
  }, function errorCallback(response) {
    console.log(response)
  })
}
    


}));

app.controller('cryptoCtrl',($scope, appFactory) => {

  $scope.coins = [{ coinName: 'Bitcoin', currentValue: 14000, amountOwned: 2 }, { coinName: 'Ethereum', currentValue: 5000, amountOwned: 5 }, { coinName: 'Bitcoin', currentValue: 14000, amountOwned: 2 }];
$scope.submit = () => {
  appFactory.getOnInit((response) => {
    $scope.coins = response;
  })
}
});
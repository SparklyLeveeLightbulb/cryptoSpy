const app = angular.module('login')
app.component('cryptoProfile', {
  templateUrl: 'profile.html',
  bindings: {
   
  }
});

app.factory('appFactory', ($http) => ({
  getOnInit: (callback, callback2) => {
    //updates user table
  $http({
  method: 'GET',
    url: '/getProfile'
  }).then(function successCallback(response) {
    callback(response.data)
  }, function errorCallback(response) {
    console.log(response)
  })
  //gets userName from server
    $http({
      method: 'GET',
      url: '/getAgentName'
    }).then(function successCallback(response) {
      callback2(response.data)
    }, function errorCallback(response) {
      console.log(response)
    })
},

    


}));

app.controller('cryptoCtrl',($scope, appFactory, $location) => {
$scope.agentName;
$scope.coinAmount;
  $scope.coins = [{ coinName: 'Bitcoin', currentValue: 14000, amountOwned: 2 }, { coinName: 'Ethereum', currentValue: 5000, amountOwned: 5 }, { coinName: 'LiteCoin', currentValue: 1300, amountOwned: 2 }];
$scope.submit = () => {
  appFactory.getOnInit((response) => {
    $scope.coins = response;
  }, (response) => {
    $scope.agentName = response;
  });
}

  $scope.changeView = (view) => {
   $location.path(view) 
  }

  $scope.addCoins = () => {
    console.log($scope.coinAmount)
  }
});
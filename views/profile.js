const app = angular.module('login')
app.component('cryptoProfile', {
  templateUrl: 'profile.html',
  bindings: {
   
  }
});

app.factory('appFactory', ($http) => ({
  getOnInit: (agent, callback, callback2) => {
    // updates user table
    
    $http({
      method: 'GET',
      url: '/getAgentName'
    }).then(function successCallback(response) {
      callback2(response.data)
     
      var req = {
        method: 'POST',
        url: '/getProfile',
        headers: {
          'Content-Type': 'application/JSON'
        },
        data: { user: response.data }
      };
      console.log(req)
      $http(req).then(function (results) {
        callback(results)
        // on initi refreshes coins table
        $http({
          method: 'GET',
          url: 'refreshtables'
        }).then((response) => {console.log(response)}, (response) => {
          console.log(response)
        })

      }, function (results) {
        callback(results);
      });

    }, function errorCallback(response) {
      console.log(response)
    })
    
    
   

  //gets userName from server
   
},

addCoins: (coinName, coinAmount, agent, callback) => {
  let url = '/userCoins' + coinName;
    var req = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/JSON'
      },
      data: { amount: coinAmount, user: agent }
    }

    $http(req).then(function (results) {
      callback(results)
    }, function(results) {
      callback(results);
    });
  
}
}));

    



app.controller('cryptoCtrl',($scope, appFactory, $location) => {
$scope.agentName;
$scope.coinName;
$scope.coinAmount;
$scope.coins;

  $scope.submit = () => {
  appFactory.getOnInit($scope.agentName, (response) => {
    console.log(response.data)
    $scope.coins = response.data[0];
  }, (response) => {
    $scope.agentName = response;
  });
}

  $scope.changeView = (view) => {
   $location.path(view) 
  }

  $scope.addCoins = () => {
    if($scope.coinAmount === undefined || $scope.coinName === undefined || Number($scope.coinAmount) === NaN) {
      alert('Please Enter Valid Info');
    } else {

      appFactory.addCoins($scope.coinName, $scope.coinAmount, $scope.agentName, (results) => {
        console.log(results);
      })
    }
  },
  
  $scope.choseCoin = (coin) => {
    $scope.coinName = coin;
    console.log($scope.coinName)
  }
});
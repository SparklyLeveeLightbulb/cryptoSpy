const app = angular.module('login')
app.component('cryptoProfile', {
  templateUrl: 'profile.html',
  bindings: {
   
  }
});

app.factory('appFactory', ($http) => ({
  getOnInit: (agent, callback, callback2) => {
    // on init function
      // gets agentName from Server
    
    $http({
      method: 'GET',
      url: '/getAgentName'
    }).then(function successCallback(response) {
      callback2(response.data)
     //sends userName for db queries
      var req = {
        method: 'POST',
        url: '/getProfile',
        headers: {
          'Content-Type': 'application/JSON'
        },
        data: { user: response.data }
      };
      
      $http(req).then(function (results) {
        callback(results)
        // on init refreshes coins table
        $http({
          method: 'GET',
          url: '/refreshtables'
        }).then((response) => {console.log(response)}, (response) => {
          console.log(response)
        })

      }, function (results) {
        callback(results);
      });

    }, function errorCallback(response) {
      console.log(response)
    })
    
    
   

 
   
},
//adds coins
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

    



app.controller('cryptoCtrl',($scope, appFactory, $window) => {
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
    //ensures that both code name and amount has been correctly input
    if($scope.coinAmount === undefined || $scope.coinName === undefined || Number($scope.coinAmount) === NaN) {
      alert('Please Enter Valid Info');
    } else {

      appFactory.addCoins($scope.coinName, $scope.coinAmount, $scope.agentName, (results) => {
        //re-renders after adding coin
        $window.location.reload();
        
      })
    }
  },
  
  $scope.choseCoin = (coin) => {
    $scope.coinName = coin;
    
  }
});
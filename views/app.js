const app = angular.module('cryptoProfile', []);

// angular.module('cryptoProfile');

app.controller('cryptoCtrl',($scope) => {
$scope.text = 'hey'
$scope.submit = () => {
  console.log($scope.text)
}
});
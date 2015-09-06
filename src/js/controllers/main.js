angular.module('app').controller('MainCtrl', function ($scope, $timeout) {
    $timeout(function () {
        $scope.msg = 'hello world';
    }, 5000);
});
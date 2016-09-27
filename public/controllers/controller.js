var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http',
function($scope,$http){
    console.log('Hello from controller');
    
    $http.get('/contactlist').success(function(response){
        console.log('I got the data from the server');
        $scope.contactList = response;
    });
    
    $scope.addContact = function(){
        console.log('Got data from the user as : ',$scope.contact);
        $http.post('/addcontact',$scope.contact);
    }
    
    
}
]);
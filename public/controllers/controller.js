var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http',
function($scope,$http){
    console.log('Successfully started controller');
    
    function refresh(){
        $http.get('/contactlist').success(function(response){
            console.log('Loading the data from the database');
            $scope.contactList = response;
            $scope.contact;
        });
    }
    refresh();
    
    $scope.addContact = function(){
        console.log('Got data from the user as : ',$scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(response){
            console.log('Validating data',response);
            refresh();
        });
    }
    
    $scope.remove = function(id){
        console.log('Removing the user data of Object Id : ',id);
        $http.delete('/contactlist/'+id).success(function(response){
            console.log('Successfully deleted the use data');
            refresh();
        });
    }
}
]);
var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http',
function($scope,$http){
    console.log('Successfully started controller');
    
    function refresh(){
        $http.get('/contactlist').success(function(response){
            console.log('Loading the data from the database');
            $scope.contactList = response;
            $scope.contact = "";
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
    
    $scope.edit = function(id){
        console.log('Editing the user data : ',id);
        $http.get('/contactlist/'+id,$scope).success(function(response){
           $scope.contact = response;
           
        });
    }
    
    $scope.update = function(){
        console.log('Updating the user data :',$scope.contact);
        $http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
            console.log('Successfully update the user id ',$scope.contact._id);
            refresh();   
        });
    }
}
]);
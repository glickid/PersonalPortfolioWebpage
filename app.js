var app = angular.module('myPortfolio', []);

app.controller('projectCtrl', function ($scope, $log, dataSrv) {

    $scope.projectArr = [];

    getProjectsDetails();

    function getProjectsDetails () {
       dataSrv.getProjectsDetails().then(function(response){
            $scope.projectArr = response;
       }, function(err) {
           $log.error(err);
       });
    };

});

app.factory('dataSrv', function ($http, $q, $log, ) {

    function getProjectsDetails() {
        var async = $q.defer();
        var dataDB = "data/db.json";

        $http.get(dataDB).then( function(response){
            async.resolve(response.data.projects);
        }, function(err) {
            $log.error(err);
            async.reject(err);
        })

        return async.promise;
    }

    return {
        getProjectsDetails : getProjectsDetails
    }
});

app.filter('renderHTMLCorrectly', function($sce)
{
	return function(stringToParse)
	{
		return $sce.trustAsHtml(stringToParse);
	}
});

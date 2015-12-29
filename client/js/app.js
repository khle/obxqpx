(function(module) {
    'use strict';
    module
    .run(['$rootScope',
        function ($rootScope) {
            
        }
    ])          
    .config(['$mdIconProvider', '$mdThemingProvider',
        function($mdIconProvider, $mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('pink')
                .accentPalette('orange');    
        }
    ])
    .controller('ListCtrl', ['$scope', function($scope) {
        $scope.countries = [
            {name: 'CN', wanted: false},
            {name: 'US', wanted: false}
        ]
    }])
    .controller('MainCtrl', ['$scope', function($scope) {
        $scope.countries = [
            {name: 'Argentina', code: 'AR', wanted: true},
            {name: 'Australia', code: 'AU', wanted: true},
            {name: 'Belgium', code: 'BE', wanted: true},
            {name: 'Chile', code: 'CL', wanted: true},
            {name: 'China', code: 'CN', wanted: true},
            {name: 'Colombia', code: 'CO', wanted: true},
            {name: 'Denmark', code: 'DK', wanted: true},
            {name: 'Ecuador', code: 'EC', wanted: true},
            {name: 'France', code: 'FR', wanted: true},
            {name: 'Germany', code: 'DE', wanted: true},
            {name: 'Great Britain', code: 'GB', wanted: true},
            {name: 'Hong Kong', code: 'HK', wanted: true},
            {name: 'India', code: 'IN', wanted: true},
            {name: 'Ireland', code: 'IE', wanted: true},
            {name: 'Israel', code: 'IL', wanted: true},
            {name: 'Italy', code: 'IT', wanted: true},
            {name: 'Mexico', code: 'MX', wanted: true},
            {name: 'Netherlands', code: 'NL', wanted: true},            
            {name: 'Norway', code: 'NO', wanted: true},
            {name: 'Philippines', code: 'PH', wanted: true},
            {name: 'Poland', code: 'PL', wanted: true},
            {name: 'South Korea', code: 'KR', wanted: true},
            {name: 'Spain', code: 'ES', wanted: true},
            {name: 'Switzerland', code: 'CH', wanted: true},            
            {name: 'United States', code: 'US', wanted: true}
        ];
        $scope.numTickets = undefined;
    }])
})(angular.module('ObxQpxApp', ['ngMaterial']))    
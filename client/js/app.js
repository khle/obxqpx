(function(module) {
        'use strict';
        module.run(['$rootScope',
            function($rootScope) {}
        ]).config(['$mdIconProvider', '$mdThemingProvider',
            function($mdIconProvider, $mdThemingProvider) {
                $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
            }
        ]).controller('ListCtrl', ['$scope',
            function($scope) {
                $scope.countries = [{
                    name: 'CN',
                    wanted: false
                }, {
                    name: 'US',
                    wanted: false
                }]
            }
        ]).controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$http', '$mdDialog', 'qpxService', 'appConstants',
            function($scope, $location, $anchorScroll, $http, $mdDialog, qpxService, appConstants) {
                //console.log(rx);
                /*
            var source = rx.Observable.fromPromise($http({
                url: "http://en.wikipedia.org/w/api.php?&callback=JSON_CALLBACK",
                method: "jsonp",
                params: {
                    action: "opensearch",
                    search: 'Rx',
                    format: "json"
                }
            })).map(function(response) {
                return response.data[1];
            });*/
                $scope.countries = [{
                    name: 'Argentina',
                    code: 'AR',
                    wanted: true
                }, {
                    name: 'Australia',
                    code: 'AU',
                    wanted: true
                }, {
                    name: 'Belgium',
                    code: 'BE',
                    wanted: true
                }, {
                    name: 'Chile',
                    code: 'CL',
                    wanted: true
                }, {
                    name: 'China',
                    code: 'CN',
                    wanted: true
                }, {
                    name: 'Colombia',
                    code: 'CO',
                    wanted: true
                }, {
                    name: 'Denmark',
                    code: 'DK',
                    wanted: true
                }, {
                    name: 'Ecuador',
                    code: 'EC',
                    wanted: true
                }, {
                    name: 'France',
                    code: 'FR',
                    wanted: true
                }, {
                    name: 'Germany',
                    code: 'DE',
                    wanted: true
                }, {
                    name: 'Great Britain',
                    code: 'GB',
                    wanted: true
                }, {
                    name: 'Hong Kong',
                    code: 'HK',
                    wanted: true
                }, {
                    name: 'India',
                    code: 'IN',
                    wanted: true
                }, {
                    name: 'Ireland',
                    code: 'IE',
                    wanted: true
                }, {
                    name: 'Israel',
                    code: 'IL',
                    wanted: true
                }, {
                    name: 'Italy',
                    code: 'IT',
                    wanted: true
                }, {
                    name: 'Mexico',
                    code: 'MX',
                    wanted: true
                }, {
                    name: 'Netherlands',
                    code: 'NL',
                    wanted: true
                }, {
                    name: 'Norway',
                    code: 'NO',
                    wanted: true
                }, {
                    name: 'Philippines',
                    code: 'PH',
                    wanted: true
                }, {
                    name: 'Poland',
                    code: 'PL',
                    wanted: true
                }, {
                    name: 'South Korea',
                    code: 'KR',
                    wanted: true
                }, {
                    name: 'Spain',
                    code: 'ES',
                    wanted: true
                }, {
                    name: 'Switzerland',
                    code: 'CH',
                    wanted: true
                }, {
                    name: 'United States',
                    code: 'US',
                    wanted: true
                }];
                $scope.request = {
                    origin: 'SFO',
                    destination: 'HKG',
                    outboundMaxStops: 0,
                    outboundMaxConnTime: 0,
                    outboundDepartureDate: new Date(2016, 4, 1),
                    outboundEarliestTime: '',
                    outboundEarliestAmPm: '',
                    outboundLatestTime: '',
                    outboundLatestAmPm: '',
                    numTickets: 1,
                    maxPrice: '',
                    refundable: '',
                    roundtrip: '',
                    inboundMaxStops: 0,
                    inboundMaxConnTime: 0,
                    inboundDepartureDate: '',
                    inboundEarliestTime: '',
                    inboundEarliestAmPm: '',
                    inboundLatestTime: '',
                    inboundLatestAmPm: '',
                    preferedCabin: '',
                    alliance: '',
                    permittedCarriers: '',
                    prohibitedCarriers: ''
                };
                $scope.submit = function() {                    
                    //source.forEach(function(x) {
                    //    $scope.isSearching = false;
                    //    console.log(x);
                    //});                    
                    
                    if($scope.request.origin.length === 0 || 
                       $scope.request.destination.length === 0 || 
                       !($scope.request.outboundDepartureDate instanceof Date)) {
                        alert('Error');
                        $scope.isSearching = false;                                           
                    }
                    else {
                        $location.hash('result');
                        $anchorScroll();
                        $scope.isSearching = true;
                        $scope.doneSearching = false;
                        
                        var postData = {
                            "request": {
                                "passengers": {
                                    "kind": "qpxexpress#passengerCounts",
                                    "adultCount": $scope.request.numTickets,
                                    "childCount": 0,
                                    "infantInLapCount": 0,
                                    "infantInSeatCount": 0,
                                    "seniorCount": 0
                                },
                                "slice": [{
                                    "kind": "qpxexpress#sliceInput",
                                    "origin": $scope.request.origin,
                                    "destination": $scope.request.destination,
                                    "date": $scope.request.outboundDepartureDate.toISOString().substring(0, 10),
                                    "maxStops": $scope.request.outboundMaxStops,
                                    "maxConnectionDuration": $scope.request.outboundMaxConnTime,
                                    "preferredCabin": $scope.request.preferedCabin,
                                    "permittedDepartureTime": {
                                        "kind": "qpxexpress#timeOfDayRange",
                                        "earliestTime": '',
                                        "latestTime": ''
                                    },
                                    "permittedCarrier": [
                                        $scope.request.permittedCarriers
                                    ],
                                    "alliance": '',
                                    "prohibitedCarrier": [
                                        $scope.request.prohibitedCarriers
                                    ]
                                }],
                                "maxPrice": $scope.request.maxPrice,
                                "saleCountry": 'CN',
                                "refundable": $scope.request.refundable,
                                "solutions": 50
                            }    
                        }
                        
                        console.log(postData);
                        
                        qpxService.search(postData).success(function(result) {
                            $scope.isSearching = false;
                            $scope.doneSearching = true;
                            
                            var trips = _.map(result.trips.tripOption, function(p) {
                                return {
                                    'price': p.saleTotal,
                                    'saleCountry': 'China'
                                };   
                            });
                            
                            $scope.response = {
                                trips: trips
                            }
                            
                            console.log(result);
                        }).error(function(error) {
                            $scope.isSearching = false;
                            $scope.doneSearching = true;
                            console.log(error);
                        });                            
                    }                    
                }                
            }
        ]).factory('qpxService', ['$http',
        function($http) {
            return {
                search: function(postData) {
                    var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + appConstants.key;
                    return $http.post(url, postData);
                }
            }
        }
    ])
})(angular.module('ObxQpxApp', ['ngMaterial', 'md.data.table']))
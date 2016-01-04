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
        ]).controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$http', '$mdDialog', 'qpxService',
            function($scope, $location, $anchorScroll, $http, $mdDialog, qpxService) {
                
                var mapPermittedTime = function(time, ampm, defAm) {                                        
                    if (time == '1:00' && (ampm == 'am' && defAm)) {
                        return '01:00';
                    } else if (time == '1:00') {
                        return '13:00';
                    } else if (time == '2:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '02:00';
                    } else if (time == '2:00') {
                        return '14:00';
                    } else if (time == '3:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '03:00';
                    } else if (time == '3:00') {
                        return '15:00';
                    } else if (time == '4:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '04:00';
                    } else if (time == '4:00') {
                        return '16:00';
                    } else if (time == '5:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '05:00';
                    } else if (time == '5:00') {
                        return '17:00';
                    } else if (time == '6:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '06:00';
                    } else if (time == '6:00') {
                        return '18:00';
                    } else if (time == '7:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '07:00';
                    } else if (time == '7:00') {
                        return '19:00';
                    } else if (time == '8:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '08:00';
                    } else if (time == '8:00') {
                        return '20:00';
                    } else if (time == '9:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '09:00';
                    } else if (time == '9:00') {
                        return '21:00';
                    } else if (time == '10:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '10:00';
                    } else if (time == '10:00') {
                        return '22:00';
                    } else if (time == '11:00' && (ampm == 'am' || (ampm == '' && defAm))) {
                        return '11:00';
                    } else if (time == '11:00') {
                        return '23:00';
                    } else return '';
                }
                
                var mapMaxStops = function(maxStops) {
                    if (maxStops == 'Non stop') 
                        return '';
                    else
                        return parseInt(maxStops);
                }
                
                var mapMaxConnTime = function(maxConnTime, maxStops) {
                    if (maxStops  == 'Non stop') 
                        return '';
                    else if (maxConnTime == '1 hour')
                        return 60;
                    else if (maxConnTime == '2 hours')
                        return 120;
                    else if (maxConnTime == '3 hours')
                        return 180;
                    else if (maxConnTime == '4 hours')
                        return 240;
                    else if (maxConnTime == '5 hours')
                        return 300;
                    else if (maxConnTime == '6 hours')
                        return 360;
                    else if (maxConnTime == '7 hours')
                        return 420;
                    else if (maxConnTime == '8 hours')
                        return 480;
                    else if (maxConnTime == '9 hours')
                        return 540;
                    else if (maxConnTime == '10 hours')
                        return 600;
                    else if (maxConnTime == '11 hours')
                        return 660;
                    else if (maxConnTime == '12 hours')
                        return 720;
                    else 
                        return '';
                }
                
                $scope.countries = [{
                    name: 'Argentina',
                    code: 'AR',
                    wanted: false
                }, {
                    name: 'Australia',
                    code: 'AU',
                    wanted: false
                }, {
                    name: 'Belgium',
                    code: 'BE',
                    wanted: false
                }, {
                    name: 'Chile',
                    code: 'CL',
                    wanted: false
                }, {
                    name: 'China',
                    code: 'CN',
                    wanted: false
                }, {
                    name: 'Colombia',
                    code: 'CO',
                    wanted: false
                }, {
                    name: 'Denmark',
                    code: 'DK',
                    wanted: false
                }, {
                    name: 'Ecuador',
                    code: 'EC',
                    wanted: false
                }, {
                    name: 'France',
                    code: 'FR',
                    wanted: false
                }, {
                    name: 'Germany',
                    code: 'DE',
                    wanted: false
                }, {
                    name: 'Great Britain',
                    code: 'GB',
                    wanted: false
                }, {
                    name: 'Hong Kong',
                    code: 'HK',
                    wanted: false
                }, {
                    name: 'India',
                    code: 'IN',
                    wanted: false
                }, {
                    name: 'Ireland',
                    code: 'IE',
                    wanted: false
                }, {
                    name: 'Israel',
                    code: 'IL',
                    wanted: false
                }, {
                    name: 'Italy',
                    code: 'IT',
                    wanted: false
                }, {
                    name: 'Mexico',
                    code: 'MX',
                    wanted: false
                }, {
                    name: 'Netherlands',
                    code: 'NL',
                    wanted: false
                }, {
                    name: 'Norway',
                    code: 'NO',
                    wanted: false
                }, {
                    name: 'Philippines',
                    code: 'PH',
                    wanted: false
                }, {
                    name: 'Poland',
                    code: 'PL',
                    wanted: false
                }, {
                    name: 'South Korea',
                    code: 'KR',
                    wanted: false
                }, {
                    name: 'Spain',
                    code: 'ES',
                    wanted: false
                }, {
                    name: 'Switzerland',
                    code: 'CH',
                    wanted: false
                }, {
                    name: 'United States',
                    code: 'US',
                    wanted: false
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
                    outboundPreferedCabin: '',
                    outboundAlliance: '',
                    outboundPermittedCarriers: '',
                    outboundProhibitedCarriers: '',
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
                    inboundPreferedCabin: '',
                    inboundAlliance: '',
                    inboundPermittedCarriers: '',
                    inboundProhibitedCarriers: ''
                };
                $scope.submit = function() {                    
                    
                    var postDatum = _.map(_.filter($scope.countries, function(c) { return c.wanted; }), function(c) {
                        var slices = $scope.request.roundtrip ? 
                            [{                                
                                "origin": $scope.request.origin,
                                "destination": $scope.request.destination,
                                "date": $scope.request.outboundDepartureDate.toISOString().substring(0, 10),
                                "maxStops": mapMaxStops($scope.request.outboundMaxStops),
                                "maxConnectionDuration": mapMaxConnTime($scope.request.outboundMaxConnTime, $scope.request.outboundMaxStops),
                                "preferredCabin": $scope.request.outboundPreferedCabin,
                                "permittedDepartureTime": {                                    
                                    "earliestTime": mapPermittedTime($scope.request.outboundEarliestTime, $scope.request.outboundEarliestAmPm, true),
                                    "latestTime": mapPermittedTime($scope.request.outboundLatestTime, $scope.request.outboundLatestAmPm, false)
                                },
                                "permittedCarrier": [
                                    $scope.request.outboundPermittedCarriers
                                ],
                                "alliance": $scope.request.outboundAlliance,
                                "prohibitedCarrier": [
                                    $scope.request.outboundProhibitedCarriers
                                ]    
                            }, {                                
                                "origin": $scope.request.destination,
                                "destination": $scope.request.origin,
                                "date": $scope.request.inboundDepartureDate.toISOString().substring(0, 10),
                                "maxStops": mapMaxStops($scope.request.inboundMaxStops),
                                "maxConnectionDuration": mapMaxConnTime($scope.request.inboundMaxConnTime, $scope.request.inboundMaxStops),
                                "preferredCabin": $scope.request.inboundPreferedCabin,
                                "permittedDepartureTime": {                                    
                                    "earliestTime": mapPermittedTime($scope.request.inboundEarliestTime, $scope.request.inboundEarliestAmPm, true),
                                    "latestTime": mapPermittedTime($scope.request.inboundLatestTime, $scope.request.inboundLatestAmPm, false)
                                },
                                "permittedCarrier": [
                                    $scope.request.inboundPermittedCarriers
                                ],
                                "alliance": $scope.request.inboundAlliance,
                                "prohibitedCarrier": [
                                    $scope.request.inboundProhibitedCarriers
                                ]    
                            }] : 
                        [{                            
                            "origin": $scope.request.origin,
                            "destination": $scope.request.destination,
                            "date": $scope.request.outboundDepartureDate.toISOString().substring(0, 10),
                            "maxStops": mapMaxStops($scope.request.outboundMaxStops),
                            "maxConnectionDuration": mapMaxConnTime($scope.request.outboundMaxConnTime, $scope.request.outboundMaxStops),
                            "preferredCabin": $scope.request.outboundPreferedCabin,
                            "permittedDepartureTime": {
                                "kind": "qpxexpress#timeOfDayRange",
                                "earliestTime": mapPermittedTime($scope.request.outboundEarliestTime, $scope.request.outboundEarliestAmPm, true),
                                "latestTime": mapPermittedTime($scope.request.outboundLatestTime, $scope.request.outboundLatestAmPm, false)
                            },
                            "permittedCarrier": [
                                $scope.request.outboundPermittedCarriers
                            ],
                            "alliance": $scope.request.outboundAlliance,
                            "prohibitedCarrier": [
                                $scope.request.outboundProhibitedCarriers
                            ]
                        }];

                        return {
                            "request": {
                                "passengers": {                                    
                                    "adultCount": $scope.request.numTickets,
                                    "childCount": 0,
                                    "infantInLapCount": 0,
                                    "infantInSeatCount": 0,
                                    "seniorCount": 0
                                },
                                "slice": slices,
                                "maxPrice": $scope.request.maxPrice,
                                "saleCountry": c.code,
                                "refundable": $scope.request.refundable,
                                "solutions": 50,
                                "displaySaleCountry": c.name
                            }    
                        }
                    });         
                    
                    if(!$scope.request.origin || 
                       !$scope.request.destination || 
                       !($scope.request.outboundDepartureDate instanceof Date)) {
                        alert('Must specify origin and destination');
                        $scope.isSearching = false;                                           
                    } else if (postDatum.length == 0) {
                            alert('Must select at least one sale country');
                    } else {
                        $location.hash('result');
                        $anchorScroll();
                        $scope.isSearching = true;
                        $scope.doneSearching = false;
                        
                        
                        
                        console.log($scope.request.outboundMaxStops);
                        console.log($scope.request.outboundMaxConnTime);
                        console.log($scope.request.outboundEarliestTime);
                        console.log(mapPermittedTime($scope.request.outboundEarliestTime, $scope.request.outboundEarliestAmPm, true)); 
                        console.log(mapPermittedTime($scope.request.outboundLatestTime, $scope.request.outboundLatestAmPm, false)); 
                        
                        
                        console.log(postDatum);                                                                                                
                        
                        $scope.response = {
                            trips: []
                        }
                        
                        /*
                        _.each(postDatum, function(postData) {                            
                            qpxService.search(postData).success(function(result) {
                                $scope.isSearching = false;
                                $scope.doneSearching = true; 
                                                                                                
                                console.log(result);
                                
                                var trips = _.map(result.trips.tripOption, function(p) {
                                    console.log(p);
                                    return {
                                        'price': p.saleTotal,
                                        'saleCountry': postData.request.displaySaleCountry
                                    };   
                                });

                                console.log(trips);                                
                                $scope.response.trips.push(trips);
                                $scope.response.trips = _.flatten($scope.response.trips, true);
                                //console.log($scope.response.trips);

                                //console.log(result);
                            }).error(function(error) {
                                $scope.isSearching = false;
                                $scope.doneSearching = true;
                                console.log(error);
                            });    
                        });
                        */                        
                        
                        /*
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
                        */
                    }                    
                }                
            }
        ]).factory('qpxService', ['$http',
            function($http) {
                return {
                    search: function(postData) {
                        //var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + 'AIzaSyBP_LPkbksr2D1s8tixqn-KT6crzJGwr8g'; //appConstants.key;
                        var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + 'AIzaSyBHkUTnIdsr33SBDKA3Yz60GSyQohiGuNM'; //appConstants.key;
                        
                        //var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search';
                        return $http.post(url, postData);

                        /*
                        var source = rx.Observable.fromPromise($http.post(url, postData)).map(function(response) {
                            return response.data[1];
                        });
                        */
                    }
                }
            }
        ])
})(angular.module('ObxQpxApp', ['ngMaterial', 'rx', 'md.data.table']))
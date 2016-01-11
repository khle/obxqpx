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
        ]).controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$http', '$mdDialog', 'qpxService', '$templateCache', '$compile', '$timeout',
            function($scope, $location, $anchorScroll, $http, $mdDialog, qpxService, $templateCache, $compile, $timeout) {                                    
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
                        return 0;
                    else
                        return parseInt(maxStops);
                }
                
                var mapMaxConnTime = function(maxConnTime, maxStops) {
                    if (maxStops  == 'Non stop') 
                        return 0;
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
                        return 0;
                }
                
                $scope.countries = [{name: 'Argentina', code: 'AR', wanted: false}, 
                                    {name: 'Australia', code: 'AU', wanted: false}, 
                                    {name: 'Belgium', code: 'BE', wanted: false }, 
                                    {name: 'Chile', code: 'CL', wanted: false }, 
                                    {name: 'China', code: 'CN', wanted: false }, 
                                    {name: 'Colombia', code: 'CO', wanted: false}, 
                                    {name: 'Denmark', code: 'DK', wanted: false}, 
                                    {name: 'Ecuador', code: 'EC', wanted: false}, 
                                    {name: 'France', code: 'FR', wanted: false}, 
                                    {name: 'Germany', code: 'DE', wanted: false}, 
                                    {name: 'Great Britain', code: 'GB', wanted: false}, 
                                    {name: 'Hong Kong', code: 'HK', wanted: false}, 
                                    {name: 'India', code: 'IN', wanted: false}, 
                                    {name: 'Ireland', code: 'IE', wanted: false}, 
                                    {name: 'Israel', code: 'IL', wanted: false}, 
                                    {name: 'Italy', code: 'IT', wanted: false}, 
                                    {name: 'Mexico', code: 'MX', wanted: false}, 
                                    {name: 'Netherlands', code: 'NL', wanted: false}, 
                                    {name: 'Norway', code: 'NO', wanted: false}, 
                                    {name: 'Philippines', code: 'PH', wanted: false}, 
                                    {name: 'Poland', code: 'PL', wanted: false}, 
                                    {name: 'South Korea', code: 'KR', wanted: false}, 
                                    {name: 'Spain', code: 'ES', wanted: false}, 
                                    {name: 'Switzerland', code: 'CH', wanted: false}, 
                                    {name: 'United States', code: 'US', wanted: false}];
                
                $scope.today = new Date();
                $scope.doneSearching = false;
                $scope.isSearching = false;
                
                $scope.request = {
                    origin: 'SFO',
                    destination: 'HKG',
                    outboundMaxStops: 0,
                    outboundMaxConnTime: 0,
                    outboundDepartureDate: new Date(),
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
                    inboundProhibitedCarriers: '',
                    allSaleCountries: true
                }
                
                $scope.sendMail = function() {                                        
                    var html = '';
                    
                    var tripTemplate = $templateCache.get('tripTemplate.html');
                    var compiledTrip = _.template(tripTemplate);
                    
                    var trips = $scope.response.trips.filter(function(trip) { return trip.selectToEmail});
                    _.each(trips, function(trip) {
                        var compiledTripHtml = compiledTrip({'currency': trip.currency, 
                                                             'price': trip.price, 
                                                             'priceInUSD': trip.priceInUSD, 
                                                             'saleCountry': trip.saleCountry});
                        html = html + compiledTripHtml;
                        _.each(trip.slices, function(slice) {
                            _.each(slice.segment, function(segment) {                                
                                var segmentHtml = $templateCache.get('segmentTemplate.html');
                                
                                var compiledSegment = _.template(segmentHtml);
                                var compiledSegmentHtml = compiledSegment({ 'carrier': segment.flight.carrier, 
                                                            'flightNumber': segment.flight.number, 
                                                            'duration': segment.duration, 'cabin': segment.cabin });
                                
                                html = html + compiledSegmentHtml;
                            })
                        })
                        html = html + '---------------------------';
                    });                            
                    
                    var body = encodeURIComponent(html);
                    var href = 'mailto:user@frosch.com?subject=Price checks&body=' + body;                    
                    window.location.href = href;    
                }
                
                $scope.submit = function() {
                    if ($scope.request.allSaleCountries) {
                        $scope.countries = $scope.countries.map(function(country) {
                            return {name: country.name, code: country.code, wanted: true};   
                        });            
                    }
                    
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
                       !$scope.request.destination) {
                        alert('Must specify origin and destination');
                        $scope.isSearching = false;                                           
                    } else if (!($scope.request.outboundDepartureDate instanceof Date)) {
                        alert('Must specify outbound date');       
                    } else if ($scope.request.roundtrip && !($scope.request.inboundDepartureDate instanceof Date)) {
                        alert('Must specify return date');
                    } else if (postDatum.length == 0) {
                            alert('Must select at least one sale country');
                    } else {                        
                        $scope.isSearching = true;                                                                                                                                                                                                                                          
                        $scope.response = {
                            trips: []
                        }
                        
                        var sortedInsertTrip = function(trips, trip) {
                            trips.splice(_.sortedIndex(trips, trip.priceInUSD), 0, val);
                            return trips;
                        };
                        
                        _.each(postDatum, function(postData) {                            
                            qpxService.search(postData).then(function(payload) {
                                var result = payload.data;
                                
                                $scope.isSearching = false;
                                $scope.doneSearching = true;                                                                                            
                                //console.log(result);
                                
                                var trips = _.map(result.trips.tripOption, function(p) {
                                    //console.log(p);
                                                                        
                                    var saleTotal = parseQpxFare(p.saleTotal);
                                    
                                    return {
                                        'saleTotal': p.saleTotal,
                                        'priceInUSD': 0, //will populate this later,
                                        'currency': saleTotal.currency,
                                        'price': saleTotal.price,
                                        'saleCountry': postData.request.displaySaleCountry,
                                        'slices': p.slice
                                    };   
                                });
                                //console.log(trips);
                                
                                _.each(trips, function(trip) {
                                    //console.log('trip.saleTotal ', trip.saleTotal);
                                    var requestedCurrencies = 'USD,'+ trip.currency;
                                    qpxService.getRate(requestedCurrencies).then(function(payload) {
                                        var result = payload.data;
                                        var quotes = result.quotes;                                                        
                                        var fromCurrency = parseFloat(quotes['USD'+trip.currency]);
                                        var toCurrency = parseFloat(quotes['USDUSD']);
                                        
                                        trip.priceInUSD = Math.round(parseInt(trip.price) * toCurrency/fromCurrency);                                                                                
                                        //console.log(trip);                                                                                
                                        $scope.response.trips.push(trip);
                                    });
                                });
                                                            
                                $timeout(function() {
                                    $location.hash('result-grid');
                                    $anchorScroll();
                                }, 1500);
                                
                                //$scope.response.trips.push(trips);
                                //$scope.response.trips = _.flatten($scope.response.trips, true);
                            });    
                        });                                                                                                                                         
                        //Watch price for currency conversion
                        $scope.$watch('displayInCurrency', function() {
                            _.each($scope.response.trips, function(trip) {                                
                                convertCurrency(trip);                                
                            })
                        });                                                                        
                    }                    
                }
                
                var convertToUSD = function(price, currency) {
                    var requestedCurrencies = 'USD,'+ currency;
                    qpxService.getRate(requestedCurrencies).success(function(result) {
                        var quotes = result.quotes;                                                        
                        var fromCurrency = parseFloat(quotes['USD'+currency]);
                        var toCurrency = parseFloat(quotes['USDUSD']);                        
                        return Math.round(parseInt(price) * toCurrency/fromCurrency);
                    }).error(function(error) {});
                }
                
                var parseQpxFare = function(fareInQpxFormat) {
                    var matches = fareInQpxFormat.match(/[a-zA-Z]+|[0-9.]+/g);
                    return {price: matches[1], currency: matches[0]}
                }
                
                var convertCurrency = function(trip) {                                        
                    var saleTotal = parseQpxFare(trip.saleTotal);
                    
                    var price = saleTotal.price;
                    var currency = saleTotal.currency;
                    
                    var requestedCurrencies = currency;                    
                    
                    if ($scope.displayInCurrency === 'Convert to USD') {
                        requestedCurrencies = requestedCurrencies + ',USD';
                        qpxService.getRate(requestedCurrencies).success(function(result) {
                            var quotes = result.quotes;                            
                            var fromCurrency = parseFloat(quotes['USD'+currency]);
                            var toCurrency = parseFloat(quotes['USDUSD']);
                            
                            trip.currency = 'USD';
                            trip.price = Math.round(parseInt(price) * toCurrency/fromCurrency);
                        }).error(function(error) {});
                    } else if ($scope.displayInCurrency === 'Convert to GBP') {
                        requestedCurrencies = requestedCurrencies + ',GBP';
                        qpxService.getRate(requestedCurrencies).success(function(result) {
                            var quotes = result.quotes;                                                        
                            var fromCurrency = parseFloat(quotes['USD'+currency]);
                            var toCurrency = parseFloat(quotes['USDGBP']);
                            
                            trip.currency = 'GBP';
                            trip.price = Math.round(parseInt(price) * toCurrency/fromCurrency);
                        }).error(function(error) {});  
                    } else if ($scope.displayInCurrency === 'Convert to EUR') {
                        requestedCurrencies = requestedCurrencies + ',EUR';
                        qpxService.getRate(requestedCurrencies).success(function(result) {
                            var quotes = result.quotes;                                                        
                            var fromCurrency = parseFloat(quotes['USD'+currency]);
                            var toCurrency = parseFloat(quotes['USDEUR']);
                            
                            trip.currency = 'EUR';
                            trip.price = Math.round(parseInt(price) * toCurrency/fromCurrency);
                        }).error(function(error) {});  
                    } else {
                        trip.currency = currency;
                        trip.price = price;    
                    }                 
                }
                
                $scope.changeCurrency = function(saleTotal) {}
            }
        ]).factory('qpxService', ['$http',
            function($http) {
                return {
                    search: function(postData) {
                        //var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + 'AIzaSyBP_LPkbksr2D1s8tixqn-KT6crzJGwr8g'; //appConstants.key;
                        var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + 'AIzaSyBHkUTnIdsr33SBDKA3Yz60GSyQohiGuNM';                        
                        return $http.post(url, postData);                        
                    },
                    getRate: function(requestedCurrencies) {
                        var url = 'http://www.apilayer.net/api/live?access_key=99ec6a37b631a327f64d356cadf950ab&currencies=' + requestedCurrencies;                        
                        return $http.get(url);
                    }
                }
            }
        ]).filter('durationFilter', [
            function() {
                return function(input) {
                    return moment.duration(input, "minutes").format("h [hrs] m [min]");
                }
            }
        ]).filter('prettyDate', [
            function() {
                return function(input) {
                    return moment(input).format("YYYY-MM-DD HH:mm");
                }
            }
        ])
})(angular.module('ObxQpxApp', ['ngMaterial', 'rx', 'md.data.table']))
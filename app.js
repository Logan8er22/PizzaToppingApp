'use strict'

var app = angular.module('myApp', [ ]);

app.controller('PizzaFormController', ['$scope', function($scope) {
        
    $scope.order = {
        customer: {},
        pizza: {
            toppings: [],
            quantity: 1
        },
        total: 0,
        complete: false
    };
    
    $scope.formSubmitted = false;
    
    $scope.pizzaSizes = [
        { name: "Small", val: "S", price: 3.99 },
        { name: "Medium", val: "M", price: 5.99 },
        { name: "Large", val: "L", price: 7.99 }
    ];

    $scope.pizzaBases = [
        { name: "Hand Tossed", val: "handTossed", price: 0 },
        { name: "Thin Crust", val: "thinCrust", price: 0 },
        { name: "Original", val: "original", price: 0 },
        { name: "Deep Pan", val: "deepPan", price: 0 },
        { name: "Stuffed", val: "stuffed", price: 1.99 }
    ];
    
    /*$scope.pizzaSauces = [
        { name: "Marinara", val: "marinara", price: 0 },
        { name: "Garlic Parmesan", val: "garlicParm", price: 1.99 },
        { name: "Barbeque", val: "bbq", price: 1.99 },
        { name: "Buffalo", val: "buff", price: 2.99 },
        { name: "No Sauce", val: "nada", price: 0 }
    ];*/
    
    $scope.pizzaToppings = [
        { name: "Extra Cheese", val: "extraCheese", price: 1.99 },
        { name: "Pepperoni", val: "pepperoni", price: 0.99 },
        { name: "Italian Sausage", val: "italianSaus", price: 0.99 },
        { name: "Premium Salami", val: "premSal", price: 1.99 },
        { name: "Bacon", val: "bacon", price: 0.99 },
        { name: "Chicken", val: "chick", price: 0.99 },
        { name: "Beef", val: "beef", price: 0.99 },
        { name: "Mushrooms", val: "mush", price: 0.50 },
        { name: "Onions", val: "onion", price: 0.50 },
        { name: "Olives", val: "olive", price: 0.50 },
        { name: "Bell Peppers", val: "bellPep", price: 0.99 },
        { name: "Banana Peppers", val: "banPep", price: 0.99},
        { name: "Pineapple", val: "pineapp", price: 0.99},
        { name: "Jalapenos", val: "jalapenos", price: 0.99}
    ];
    
    $scope.updateToppings = function ( pizzaTopping ) {
        var addTopping = true;
        
        if( $scope.order.pizza.toppings.length > 0 ) {
            for( var i=0; i < $scope.order.pizza.toppings.length; i++ ) {
                if( pizzaTopping === $scope.order.pizza.toppings[ i ] ) {
                    $scope.order.pizza.toppings.splice( i, 1 );
                    addTopping = false;
                }
            }
        }
        if( addTopping === true ) {
            $scope.order.pizza.toppings.push( pizzaTopping );
        }
        $scope.updateOrderTotal();
    };
    
    $scope.updateOrderTotal = function () {
        $scope.order.total = 0;
        if( $scope.order.pizza.hasOwnProperty( 'size' ) ) {
            $scope.order.total += $scope.lookUpOption( $scope.pizzaSizes, $scope.order.pizza.size, 'price' );
        }
        if( $scope.order.pizza.hasOwnProperty( 'base' ) ) {
            $scope.order.total += $scope.lookUpOption( $scope.pizzaBases, $scope.order.pizza.base, 'price' );
        }
        /*if( $scope.order.pizza.hasOwnProperty( 'sauce' ) ) {
            $scope.order.total += $scope.lookUpOption( $scope.pizzaSauces, $scope.order.pizza.sauce, 'price' );
        }*/
        if( $scope.order.pizza.toppings.length > 0 ) {
            angular.forEach( $scope.order.pizza.toppings, function( orderedTopping ) {
                $scope.order.total += $scope.lookUpOption( $scope.pizzaToppings, orderedTopping, 'price' );
            });
        }
        $scope.order.total *= $scope.order.pizza.quantity;
    };

    $scope.submit = function () {
        $scope.formSubmitted = true;
        
        if( $scope.pizzaForm.$valid ) {
            $scope.order.complete = true;
        }
    };

    $scope.lookUpOption = function ( itemList, optionVal, requiredVal ) {
        var foundVal;
        angular.forEach( itemList, function( item ) {
            if( optionVal === item.val ) {
                foundVal = item[ requiredVal ];
            }
        });
        return foundVal;
    };
    /*
    $scope.remove = function($index) {
        $scope.order.complete = $scope.latestData();
        $scope.order.complete.splice($index, 1);
        return LocalStorageService.setData('my-storage', angular.toJson($scope.order.complete));
    };
    
    $scope.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
    
    $scope.update = function(psize, pbase, ptopping) {
        $scope.order.complete = $scope.latestData();
        if($scope.order.complete == null) {
            $scope.order.complete = [];
        }
        var order = { size: psize, base: pbase, topping: ptopping };
        console.log(angular.toJason(order));
        $scope.order.complete.push(order);
        return LocalStorageService.setData('my-storage', angular.toJson($scope.order.complete));
    };
    
    if($scope.order.complete != null) {
        $scope.order.complete = $scope.latestData();
    }else{
        console.log("crlkey");
    }
    
    myApp.factory("LocalStorageService", function($window, $rootScope) {
        angular.element($window).on('storage', function(event){
            if (event.key === 'my-storage') {
                $rootScope.$apply();
            }
        });
        return {
            setData: function(key, val) {
                $window.localStorage && $window.localStorage.setItem(key, val);
                return this;
            },
            getData: function(key) {
                var val = $window.localStorage && $window.localStorage.getItem(key);
                
                var data = angular.fromJson(val);
                
                return data;
            }
        };
    })*/
    
}]);
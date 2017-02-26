(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ListService', ListService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
/*.filter('MonFiltre', MyFilter);

function MyFilter(){
       return function(input){
           input = input.find;
       };
   }])
*/

ShoppingListController.$inject = ['ListService'];
function ShoppingListController(ListService) {
  var list = this;
  list.itemName="";
  list.items =[];

  list.search= function (){
  console.log(" contenu de la recherche list.itemName ",list.itemName) ;
    var promise = ListService.getMenu();
  promise.then(function (response) {
    list.items = response.data.menu_items;
    console.log(" contenu de la requete ",list.items) ;
    var x=[];
    for( var i in list.items ) {
        console.log(" contenu de list.items ",list.items[i]) ;
      x[i] =list.items[i];
      console.log(" contenu de la x[i] ",x[i]) ;
    }
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
  };

  console.log(" list ",list) ;
}


ListService.$inject = ['$http', 'ApiBasePath'];
function ListService($http, ApiBasePath) {
  var service = this;

  service.getMenu = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };
}

})();

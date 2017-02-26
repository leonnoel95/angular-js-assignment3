(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ListService', ListService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItems);

ShoppingListController.$inject = ['ListService'];
function ShoppingListController(ListService) {
  var list = this;
  list.itemName="";
  list.items =[];
  list.found=[];

  list.getMatchedMenuItems= function (){
  var promise = ListService.getMenu();
  promise.then(function (response) {
    list.found=[];
    list.items = response.data.menu_items;
    console.log("list.itemName ",list.itemName);
    console.log(" contenu de la requete ",list.items) ;
    var k = 0;
    if (list.itemName.trim() !=""){
    for ( var i in list.items ) {
      if (list.items[i].description.toLowerCase().indexOf(list.itemName.toLowerCase() ) >-1) {
        list.found[k++]=list.items[i];
//       console.log("found[k] ",list.found[k-1]);
      }
    }
  }
    console.log(" contenu de found ",list.found) ;
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
function FoundItems(){
  var ddo={
       templateUrl: 'displayitemfound.html'
//     template: '{{item.name}} ; {{item.short_name}} ; {{item.description}}'
  };
  return ddo;
}
})();

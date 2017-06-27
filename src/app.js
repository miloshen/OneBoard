var oneApp = angular.module('OneBoard',[]);


oneApp.controller('indexController',function($scope){
	$scope.pbis = [
	{
		title:"develop the customer page",
		toDos:[
		{
			title:"implement",
			assignTo:"milo shen",
			description:""
		}
		],
		inProgress:[],
		done:[]
	}
	];

	$scope.mytest = function(){
		event.effectAllowed = "copy";
	}

	$scope.enterTest = function(){
		event.stopPropagation();
        event.preventDefault();
        event.currentTarget.classList.add("dragHover");
        return false;
	}

	$scope.dropTest = function(){
		alert('2');
		event.preventDefault();
		event.stopPropagation();
		event.currentTarget.classList.remove("dragHover");
	}
});

oneApp.directive('task',function(){
	return{
		restrict:'A',
		scope:{
			dragStart:'&'
		},
		link:function(scope,element,attrs,ngModel){
			element[0].addEventListener('dragstart',handleDragStart,false);
			function handleDragStart(evt){
				scope.dragStart.prototype.event = evt;
				scope.dragStart();
			}
		}
	}
});

oneApp.directive('dragArea',function(){
	return{
		restrict:'A',
		scope:{
			dragEnter:'&',
			drop:'&'
		},
		link:function(scope,elements,attrs,ngModel){
			elements[0].addEventListener('dragenter',handleDragEnter,false);
			elements[0].addEventListener('drop',handleDrop,false);
			function handleDragEnter(evt){
				scope.dragEnter.prototype.event = evt;
				scope.dragEnter();
			}
			function handleDrop(evt){
				alert('333');
				scope.drop.prototype.event = evt;
				scope.drop();
			}
		}
	}
});
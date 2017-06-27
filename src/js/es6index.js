
let x = n => n+1;

const y = 3.1415;

function f(){console.log("I'm outside");}
(function(){
	if(false){
		function f(){console.log('I am inside');}
	}
	f();
}());

let o = t => t+3;
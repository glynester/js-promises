var p1 = new Promise(function(resolve, reject){
	setTimeout(function(){
		resolve("one");
	},3000);
})

var p2 = new Promise(function(resolve, reject){
	setTimeout(function(){
		resolve("two");
	},1000);
})


var p3 = new Promise(function(resolve, reject){
	setTimeout(function(){
		resolve("three");
	},4000);
});

// Promise.all([p1, p2, "some-non-promise", p3])
// 	.then(function(values){
// 		console.log(values);
// 	})
// 	.catch(function(error){
// 		console.log(error);
// 	})

Promise.race([p1,p2,p3])
	.then(function(winner){
		console.log("First past the post: ", winner);
	})
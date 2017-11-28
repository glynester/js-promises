var request = require('request');

function http(url, method){
	method = method.toLowerCase();

	var options = {
		url,
		headers:{
			'User-Agent': 'request'
		}
	};

	return new Promise(function(resolve, reject){
		request[method](options, function(err,response,body){
			if (err){
				reject(err)
			}
			if (body){
				resolve(JSON.parse(body));
			}
			
		});
	});
}

// My github id: 20479118


console.log("Fetching users...");
var user, repo;
http("https://api.github.com/users?since=20479117", "GET")

	.then(function(users){
		console.log("Fetching repos...");
		user = users[0];
		return http(user.repos_url, "GET");
	})
	.then(function(repos){
		console.log("Fetching languages...");
		repo = repos[1];
		return http(repo.languages_url, "GET");
	})
	.then(function(langs){
		console.log(`USER: ${user.login} , REPO: ${repo.name}, LANGUAGES: ${JSON.stringify(langs)}`);
	})
	.catch(function(err){
		console.log("Error caught: ", err);
	});




// console.log("Fetching users...");
// http("https://api.github.com/users?since=20479117", "GET")
// 	.then(function(users){
// 		console.log("Fetching repos...");
// 		var user = users[0];
// 		return http(user.repos_url, "GET");
// 	})
// 	.then(function(repos){

// 		var rep = {};
// 		repos.forEach(r=>{
// 			rep[r.name] = r.language;
// 			}
// 		)
// 		console.log(rep);
// 	})
// 	.catch(function(err){
// 		console.log("Error caught: ", err);
// 	});



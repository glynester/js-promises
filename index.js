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


// var user, repo;
var user = "glynester", repo="djangogirls",
url = "https://api.github.com/users/" + user;
console.log("Fetching user...");
http(url, "GET")
	.then(function(user){
		console.log("Fetching repos...");
		return http(user.repos_url, "GET");
	})
	.then(function(repos){
		repoArr = [];
		var repoObj;
		repos.forEach(r=>{
			repoObj = {};
			repoObj[r.name] = r.language;
			repoArr.push(repoObj);
			}
		)
		return repoArr;
	})
	.then(function(reps){
		var langs;
		reps.forEach(r=>{
			if (Object.keys(r)[0] === repo){
				langs = Object.values(r)[0];
			}
		});
		console.log(`The language(s) used by "${user}" on the "${repo}" project are: ${langs}`);
	})
	.catch(function(err){
		console.log("Error caught: ", err);
	});

// var user, repo;
// console.log("Fetching users...");
// http("https://api.github.com/users?since=20479117", "GET")
// 	.then(function(users){
// 		console.log("Fetching repos...");
// 		user = users[0];
// 		return http(user.repos_url, "GET");
// 	})
// 	.then(function(repos){

// 		repo = {};
// 		repos.forEach(r=>{
// 			repo[r.name] = r.language;
// 			}
// 		)
// 		console.log(repo);
// 	})
// 	.catch(function(err){
// 		console.log("Error caught: ", err);
// 	});


// console.log("Fetching users...");
// var user, repo;
// http("https://api.github.com/users?since=20479117", "GET")

// 	.then(function(users){
// 		console.log("Fetching repos...");
// 		user = users[0];
// 		return http(user.repos_url, "GET");
// 	})
// 	.then(function(repos){
// 		console.log("Fetching languages...");
// 		repo = repos[1];
// 		return http(repo.languages_url, "GET");
// 	})
// 	.then(function(langs){
// 		console.log(`USER: ${user.login} , REPO: ${repo.name}, LANGUAGES: ${JSON.stringify(langs)}`);
// 	})
// 	.catch(function(err){
// 		console.log("Error caught: ", err);
// 	});






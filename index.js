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
http("https://api.github.com/users?since=20479117", "GET")
	.then(function(users){
		console.log("Fetching repos...");
		var user = users[0];
		return http(user.repos_url, "GET");
	})
	.then(function(repos){
		repos.forEach(r=>{
			console.log(r.name);
			}
		)
	})
	.catch(function(err){
		console.log("Error caught: ", err);
	});


	
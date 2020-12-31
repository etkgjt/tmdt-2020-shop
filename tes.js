var axios = require('axios');
var data = JSON.stringify({ username: 'user', password: 'admin' });

var config = {
	method: 'delete',
	url: 'https://c792c566c678.ngrok.io/api/demo/delete/24',
	headers: {
		'Authorization':
			'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjAzODk5MDAxLCJleHAiOjE2MDM5MDI2MDF9.TeSV1FDY7wq392gzbZexAyML3mYzey3Ki9ZQ9HMqQf08t0MrnVD8_YvG0-dY2Dggc4JzvMiBaLSXUdtVfRhF0g',
		'Content-Type': 'application/json',
		'Cookie': 'JSESSIONID=AB9847B3E64403E1AEE4A38B918E4FF0',
	},
	data: data,
};

axios(config)
	.then(function (response) {
		console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
		console.log(error);
	});

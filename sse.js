const express = require('express');
const app = express();
const fs = require('fs');
let client;

app.use(express.static('.'))

// listen file
fs.watch('index.js', (eventType, filename) => {
	client.write('data: File change\n\n');
})


app.get('/', (req, res) => {
	return res.sendFile(process.cwd() + '/index.html');
})

app.get('/test', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive'
	});
	res.write('\n');
	client = res;
});

app.listen(3002, () => {
	console.log('listening port: 3002');
});

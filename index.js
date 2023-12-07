const session = require("express-session");
const RedisStore = require("connect-redis").default;
// const { createClient } = require("redis");
const Redis = require("ioredis");
const express = require("express");
const app = express();

const port = 3000;
const sessSecret = "sessionSecret;

// Initialize client with redis
// let redisClient = createClient();
// redisClient.connect().catch(console.error);

// Initialize client with ioredis
let redisClient = new Redis();

// Initialize store
const redisStore = new RedisStore({
	client: redisClient,
	prefix: "sess:"
});

app.use(session({
	store: redisStore,
	secret: sessSecret,
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));

app.get("/", (req, res) => {
	res.send("Hello Express");
});

app.get("/counter", (req, res) => {
	if(req.session.count) {
		console.log(req);
		req.session.count++;
	} else {
		req.session.count = 1;
	}

	res.send(`Current count: ${req.session.count}`);
});

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`);
});

const http = require("http");
const mongodb = require('mongodb');

const hostname = "127.0.0.1"; // localhost
const port = 3000;
const url = 'mongodb://localhost:27017';
const mongoClient = new mongodb.MongoClient(url);

async function startServer() {
    // connect to database
    await mongoClient.connect();
    // listen for requests
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    // User Object holen
    const userCollection = mongoClient.db('airbnb').collection('users');
    if (request.method === "POST") {
        let jsonObject = "";
        request.on("data", (data) => {
            jsonObject += data;
        });
        request.on("end", () => {
            // User Object (Login/Registrierung) für DB
            console.log(JSON.parse(jsonObject));
        });
    }
});

startServer();
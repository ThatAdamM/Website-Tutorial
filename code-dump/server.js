// We're working with the server functions
// This brings a library into our code which we will install later!
// ExpressJS is used to route all our requests.

// Variables in javascript begin with "const", "let" or "var". 
// Note semi-colons are used to tell it when we're moving to a new line.
let express = require("express");
let app = express();

// We can use the express.static() function which quickly gives us everything in the /public folder
app.use("/", express.static("public"));

// We can also make our own paths which do stuff when we make a request to it!
// For example, lets make our counter endpoint!
// Create a variable that stores how many visits we have had
let visits = 0;
// Create a function which takes a request and response object 
function incrementCounter(request, response) {
  // The ++ adds 1 to the variable
  visits++;
  // Send the variable back with a status of 200
  // The status is 200 since it's OK. This is similar to those 404 errors you get, but the express library handles those for us :D
  response.status(200).send(visits.toString());
  // And we're done!
}

// Now recieve "GET" requests at "/counter" (The standard HTTP request you use to access webpages like google) 
app.get("/counter", incrementCounter);

// This is where CertBot's temp files are saved. We need to serve these too.
app.use(express.static(".well-known/acme-challenge"));

// Set up https server with the key & cert on port 3001
require("https").createServer({
    key: require("fs").readFileSync("/letsencrypt/live/example.example.com/privkey.pem"),
    cert: require("fs").readFileSync("/letsencrypt/live/example.example.com/fullchain.pem")
}, app).listen(3001);
console.log("https on port 3001");

// We'll listen on port 3000 - More about this later
// We can also pass a function, so I've added one that tells us 
// when it's ready for listening!
app.listen(3000, function() {
  console.log("Listening on port 3000!")
});
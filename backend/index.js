const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

const app = express();
app.use(cors())
const port = 4000

let userDatabase = [
  {
    user: "pmanal1",
    pass: "MockPassword123!"
  },
  {
    user: "admin",
    pass: "password"
  },
  {
    user: "Mark",
    pass: "Mark"
  }
];
let homeDatabase = [
  {
    id: 1,
    user: "admin",
    name: "Apartment",
    location: "New York",
    cost: 500,
    reserved: ''
  },
  {
    id: 2,
    user: "admin",
    name: "Cabin",
    location: "Europe",
    cost: 200,
    reserved: 'Mark'
  }
];

let ids = 3;

app.get('/', (req, res) => {
  res.send('Welcome to the AirBn3 backend!')
})

app.post('/login', jsonParser, (req, res) => {
  const user = userDatabase.find(user => {
    if(req.body.user === user.user) {
      return user;
    }
  });
  
  if(!user || user.pass !== req.body.pass) {
    res.send(false);
  } else {
    res.send(user);
  }
});

app.get('/home', (req, res) => {
  const user = req.query.userFilter;
  const reserved = req.query.reservedFilter;
  let query = homeDatabase;
  if(user) {
    query = query.filter(home => user === home.user)
  }
  if(reserved === 'true') {
    query = query.filter(home => home.reserved !== '')
  }
  res.send(query);
})

app.post('/home', jsonParser, (req, res) => {
  const home = {
    id: ids,
    user: req.body.user,
    name: req.body.name,
    location: req.body.location,
    cost: req.body.cost,
    reserved: ''
  }

  if(!home.name || !home.location || !home.cost) {
    res.send("Missing params");
  } else {
    console.log(home);
    ids++;
    homeDatabase.push(home);
    res.status(200);
  }
});

app.patch('/home', jsonParser, (req, res) => {
  console.log(req.body.reserved);
  const home = homeDatabase.find(home => {if(req.body.id == home.id) { return home; } });
  console.log("old home:", home);
  home.reserved = req.body.reserved;
  console.log("bew home:", home);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

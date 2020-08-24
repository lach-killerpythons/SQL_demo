// from https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
// Need to update the following for your own postgres database
//1
const pguser = ['web', 'editor']; //web = SELECT ; editor = INSERT SELECT UPDATE DELETE  (users defined in postgres)
//2
const SECRET = "XXXXXXXXXX"; // Cannot GET /queries.js
//3
var currentUser = 'editor';  // THESE ARE EXAMPLE USER NAMES
//4
var myDatabase = 'MYDATABASE';

var Pool = require('pg').Pool
var pool = new Pool({
  user: currentUser,
  host: 'localhost', // locally hosted example
  database: myDatabase, // THIS IS AN EXAMPLE NAME
  password: SECRET,
  port: 5432,
})

// needs to be updated to get password (not all use same password)
function dbConnect(pg_user){
    pool.end().then(() => console.log('pool has ended'))
    pool = new Pool({
      user: pg_user,
      host: 'localhost',
      database: myDatabase,
      password: SECRET,
      port: 5432,
    })
    console.log(pg_user + ' has connected')
}

function new_Cookie(res, myCookie){
                   res.cookie("myCookie", myCookie);
                   res.send('user data added to cookie');
                   }


const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


var name = 'new';
//var  email = 'noemail@web.com';

const testUser = function(req, res) {
  //const name = request.params.name
  //const email = request.params.email

  dbConnect('editor')

  res.clearCookie('foo');
  res.send('cookie foo cleared');

  const name = req.query.name;
  const email = req.query.email;
  //const { name, email } = request.body;

  //const name = request.params.d;
  console.log("Adding user :" + name);
  //console.log(typeof(name), name, typeof(email), email);
  if (typeof(name)!='undefined'){
      //return request[1];
      //res.status(201).send(`POST - string`);
      console.log(name + " - adding to DB");
        pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
          if (error) {
            //console.log('donkey dicks magoo')
            console.log(error)
            res.status(201).send(`error - check console` + error)
          }
          if (!error) {res.status(201).send(`User added` + name )}

        })
  } else {
      //return 0;
      res.status(201).send(`NULL` + name + req.body);

  };
}

const createUser = (request, response) => {
  dbConnect('editor');
  //const { name, email } = request.body
  const name = request.query.name;
  const email = request.query.email;
  //const name = request.params.name
  //const email = request.params.email
  //response.status(200).send(name)
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(201).send(`User added` )
  })
  dbConnect('web');
}

const updateUser = (request, response) => {

  //const { name, email } = request.body

  const name = req.query.name;
  const email = req.query.email;
  const id = parseInt(request.params.id)
  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      //throw error
      response.status(200).send(error)
    }
    if (!error){response.status(200).send(`User deleted with ID: ${id}`)}

  })
}

//you must put this in all *.js files to import them
module.exports = {
  getUsers,
  getUserById,
  createUser,
  testUser,
  updateUser,
  deleteUser,
  new_Cookie
}
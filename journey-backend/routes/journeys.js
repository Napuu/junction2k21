var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const results = [];

const connectionString = process.env.CONNECTION_URI



const getRoutes = async (date, zipcode) => {
  const client = new Client({
    connectionString,
  })
  client.connect()

  const text = 'SELECT * FROM journeys WHERE j_date=$1 and kotipostinro=$2 LIMIT 100'
  const values = [date, zipcode]

  let res;
  try {
    let journeys = await client.query(text, values)
    // console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    //return res.rows[0]
    let ids = []
    journeys.rows.forEach(row => {
      ids.push(row["kotipostinro"] + row["postinro"])
    });

    res = await client.query("SELECT * FROM route WHERE id in ('" + ids.join("','") + "')")


  } catch (err) {
    console.log(err.stack)
    res = { "error": err.message }
  } finally {
    client.end()
    return res
  }
}

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const postalCode = req.query?.postalCode
  const date = req.query?.date
  const routes = await getRoutes(date, postalCode)
  res.send(routes);
});

module.exports = router;

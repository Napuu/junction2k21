const { Pool, Client } = require('pg')
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const connectionString = process.env.CONNECTION_URI

fs.createReadStream('../elisa_liikkuvuus_dataset.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);

    const client = new Client({
      connectionString,
    })
    client.connect()

      const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
      const values = ['brianc', 'brian.m.carlson@gmail.com']
      
      results.forEach(result => {
        const text = 'INSERT INTO journeys(j_date, start_location, end_location, quantity) VALUES($1, $2, $3, $4) RETURNING *'
        const values = [result['DATE'], result['KOTIPOSTINRO'], result['POSTINRO'], result['QUANTITY']]
        
        client
        .query(text, values)
        .then(res => {
          console.log(res.rows[0])
        })
        .catch(e => console.error(e.stack))

    })

    client.end()
    
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
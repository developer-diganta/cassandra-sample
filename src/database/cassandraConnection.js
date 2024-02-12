const cassandra = require('cassandra-driver');
const cassandraConfig = require('../configs/cassandra.config')

const client = new cassandra.Client(cassandraConfig);

client.connect(function (err) {
    if (err) {
      console.error('There was an error connecting to the database', err);
    } else {
      console.log('Connected to Cassandra database');
    }
  });
  
  module.exports = client;
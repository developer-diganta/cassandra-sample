const cassandraConfig = {
    contactPoints: [process.env.CONTACT_POINT],
    localDataCenter: process.env.LOCAL_DATA_CENTER,
    keyspace: process.env.KEYSPACE
}

module.exports = cassandraConfig;
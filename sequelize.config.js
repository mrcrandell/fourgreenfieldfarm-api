require('dotenv').config();

module.exports = (() => {
  const {
    DATABASE_DIALECT,
    SQL_DATABASE,
    READER_SQL_HOST,
    WRITER_SQL_HOST,
    SQL_HOST,
    SQL_USER,
    SQL_PASSWORD,
  } = process.env;
  if (DATABASE_DIALECT === 'mysql') {
    // Set up schema if it isn't already there

    return {
      database: SQL_DATABASE,
      dialect: 'mysql',
      dialectOptions: {
        bigNumberStrings: true,
        options: {
          useUTC: false, // for reading from database
        },
        
      },
      replication: {
        read: [
          {
            host: READER_SQL_HOST !== undefined ? READER_SQL_HOST : SQL_HOST,
            username: SQL_USER,
            password: SQL_PASSWORD,
          },
        ],
        write: {
          host: WRITER_SQL_HOST !== undefined ? WRITER_SQL_HOST : SQL_HOST,
          username: SQL_USER,
          password: SQL_PASSWORD,
        },
      },
      seederStorage: 'sequelize',
      seederStorageTableName: 'SequelizeSeedMeta',
      // logging: true, // Enable for debugging
    };
  }
  if (DATABASE_DIALECT === 'sqlite') {
    return {
      password: null,
      storage: './database/sqlite.db',
      dialect: 'sqlite',
      // logging: true, // Enable for debugging
    };
  }
})();

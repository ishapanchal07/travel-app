const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

// MongoDB Connection (NoSQL)
const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roamster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// PostgreSQL Connection (RDMS)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'roamster_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected');
    
    // Sync models in development
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synchronized');
    }
    
    return sequelize;
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    throw error;
  }
};

// Connect all databases
const connectDB = async () => {
  await connectMongoDB();
  await connectPostgreSQL();
};

module.exports = connectDB;
module.exports.sequelize = sequelize;
module.exports.mongoose = mongoose;


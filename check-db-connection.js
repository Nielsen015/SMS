// check-db-connection.js
const prisma = require('./src/lib/prisma'); // Adjust the path as necessary
const { PrismaClient } = require('@prisma/client');

async function checkDatabaseConnection() {
  try {
    // Perform a lightweight query to test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database is connected successfully.');
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit with error code
  } finally {
    await prisma.$disconnect(); // Clean up connection
  }
}

checkDatabaseConnection();
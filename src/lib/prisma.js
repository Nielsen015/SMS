// lib/prisma.js
const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;
globalForPrisma.prisma = globalForPrisma.prisma ?? prismaClientSingleton();

module.exports = globalForPrisma.prisma;
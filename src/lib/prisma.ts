import { PrismaClient } from "@prisma/client";

// declare prisma client variable
const PrismaClientSingleton = () =>{
    return new PrismaClient()
}

// check if prisma client exists if not create prisma client
declare const globalThis: {
    prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton()

export default prisma

// If environment is not development, then we will use the prisma client from the environment variable
if (process.env.NODE_ENV !=='production') globalThis.prismaGlobal = prisma
import { PrismaClient } from '@prisma/client'
import {ContextParameters} from "graphql-yoga/dist/types";
import {prisma} from "./schema";


export type Context = {
    prisma: PrismaClient
    request: any
}

export const createContext = (request: ContextParameters): Context => ({
    ...request,
    prisma,
})
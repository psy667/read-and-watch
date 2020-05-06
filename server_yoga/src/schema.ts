import {makeExecutableSchema} from "graphql-tools";
import {importSchema} from "graphql-import";
import {Mutation} from "./mutation";
import {Query} from "./query";
import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation

}
const typeDefs = importSchema("src/schema/schema.graphql");

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs
})
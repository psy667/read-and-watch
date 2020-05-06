import {makeExecutableSchema} from "graphql-tools";
import {importSchema} from "graphql-import";
import {Mutation} from "./mutation";
import {Query} from "./query";

const resolvers = {
  Query,
  Mutation

}
const typeDefs = importSchema("src/schema/schema.graphql");

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs
})
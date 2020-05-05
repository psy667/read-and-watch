import {Book} from "./Book";
import {nexusPrismaPlugin} from "nexus-prisma";
import { intArg, makeSchema, objectType, stringArg } from '@nexus/schema'
import {Mutation} from "./Mutation";
import {Query} from "./Query";
import path from "path";



export default makeSchema({
    types: [Query, Mutation, Book],
    plugins: [nexusPrismaPlugin()],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '.prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('../context'),
                alias: 'Context',
            },
        ],
    },
})
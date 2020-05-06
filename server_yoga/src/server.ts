import { GraphQLServer } from 'graphql-yoga'
import {schema} from './schema'
import { createContext } from './context'
import {googleStrategy} from "./google-auth";
import passport from "passport";


const server = new GraphQLServer({
    schema,
    context: createContext,
})


server.start(() => console.log(`🚀 Server ready at http://localhost:4000`))
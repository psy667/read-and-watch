import {objectType, mutationType} from '@nexus/schema'

export const Mutation = mutationType({
    definition(t: any) {
        t.crud.addBook()
    }
})
import {objectType, mutationType, queryType} from '@nexus/schema'

export const Query = queryType({
    definition(t: any) {
        t.crud.books({
            type: "Book", ordering: true, filtering: true,
        })
    }
})
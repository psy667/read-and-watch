import {objectType} from '@nexus/schema'

export const Book = objectType({
    name: 'Book',
    definition(t: any) {
        t.model.id()
        t.model.title()
        t.model.description()
        t.model.status()
        t.model.startDate()
        t.model.endDate()
        t.model.rating()
        t.model.comment()
        t.model.poster()
        t.model.tags()
        t.model.group()
        t.model.user()
    }
})
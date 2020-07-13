import {apollo} from "../index";
import {fromPromise, gql} from "@apollo/client";

export class BooksService {
    getBooks() {
        return fromPromise(apollo.query({
            query: gql`
                {
                    books {
                        id
                        title
                    }
                }
            `
        }))
    }
}


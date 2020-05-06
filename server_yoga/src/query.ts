import {Context} from "./context";

export const Query = {
    books: (parent: any, args: any, ctx: Context) => {
        return ctx.prisma.book.findMany()
    }
}
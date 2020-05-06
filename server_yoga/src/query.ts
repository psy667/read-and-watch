import {Context} from "./context";

export const Query = {
    books: (parent, args, ctx: Context) => {
        return ctx.prisma.book.findMany()
    }
}
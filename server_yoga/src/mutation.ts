import {authenticateGoogle} from "./google-auth";

export const Mutation = {
    authGoogle: async (_, { input: { accessToken } }, context) => {
        const {request,response} = context
        request.body = {
            ...request.body,
            access_token: accessToken,
        };

        const { data, info } = await authenticateGoogle(request, response);
        console.log(data);

        return ({
            name: data.profile.displayName,
            token: data.profile.id
        })
    },
    signUp: async (_, input, ctx) => {
      const result = await ctx.prisma.user.create({data: {email: input.email, name: "Test"}});
      console.log(result);
    },
    addBook: async (_, input, ctx) => {
        const {title} = input;

        console.time('addBook');
        const result = await ctx.prisma.book.create({data:
                {
                    title,
                    user: {connect: {id: 1}}
                },
        });
        console.timeEnd('addBook');
        console.log(result);

    }
}
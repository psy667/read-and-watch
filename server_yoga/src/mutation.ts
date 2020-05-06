import {authenticateGoogle} from "./google-auth";

export const Mutation = {
    authGoogle: async (_, { input: { accessToken } }, context) => {
        // console.log(context)
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
        // try {
        //     // data contains the accessToken, refreshToken and profile from passport
        //     const { data, info } = await authenticateGoogle(req, res);
        //
        //     if (data) {
        //         const user = await User.upsertGoogleUser(data);
        //
        //         if (user) {
        //             return ({
        //                 name: user.name,
        //                 token: user.generateJWT(),
        //             });
        //         }
        //     }
        //
        //     if (info) {
        //         console.log(info);
        //         switch (info.code) {
        //             case 'ETIMEDOUT':
        //                 return (new Error('Failed to reach Google: Try Again'));
        //             default:
        //                 return (new Error('something went wrong'));
        //         }
        //     }
        //     return (Error('server error'));
        // } catch (error) {
        //     return error;
        // }
    },
}
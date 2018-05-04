import formatErrors from '../utils/formatErrors';
import requiresAuth from "../permissions";

export default {
    Query : {
        allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) => 
            models.Team.findAll({ id: user.id }, { raw: true })),
    },
    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                await models.Team.create({...args, owner: user.id })
                return {
                    ok: true,
                }
            } catch(err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        })
    },
    Team: {
        channels: ({ id }, args, { models, user }) => models.Channel.findAll({ teamId: id }),
    },
}
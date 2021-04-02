import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'
import { User } from './schemas/User';
import { Product } from './schemas/Product';

const databaseURL =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // This sets how long they will stay logged in
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: [ 'name', 'email', 'password'],
        // TODO: Add in the users initial role
    }
})

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            // The line below passes along the cookie we created
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        // TODO: Add data seeding here
    },
    lists: createSchema({
        // Schema items go in here
        User,
        Product,
    }),
    ui: {
        // Show the UI only for people who pass this test
        isAccessAllowed: ({ session }) => {
            console.log(session);
            return !!session?.data;
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        // This is a GraphQL query
        User: 'id name email'
    })
}));

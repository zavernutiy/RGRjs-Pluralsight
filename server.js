import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';
let MONGO_URL = 'mongodb://zavernutiy:max5187652@ds145355.mlab.com:45355/rgrjs_pluralsight';

let app = express();
app.use(express.static('public'));

(async() => {
    let db = await MongoClient.connect(process.env.MONGO_URL || MONGO_URL);

    app.use('/graphql', GraphQLHTTP({
        schema: schema(db),
        graphiql: true
    }));
    app.listen(3000, () => console.log('listening on port 3000'));
})();

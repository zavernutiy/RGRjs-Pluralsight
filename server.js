import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';
let MONGO_URL = 'mongodb://zavernutiy:max5187652@ds145355.mlab.com:45355/rgrjs_pluralsight';

let app = express();

app.use(express.static('public'));

app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true
}));

let db;
MongoClient.connect(process.env.MONGO_URL || MONGO_URL, (err, database) => {
    if (err) throw err;

    db = database;
    app.listen(3000, () => console.log('listening on port 3000'));
});

app.get('/data/links', (req, res) => {
    db.collection('links').find({}).toArray((err, links) => {
        if (err) throw err;

        res.json(links);
    });
});
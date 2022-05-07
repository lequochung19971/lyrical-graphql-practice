const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const cors = require('cors');


const app = express();
app.use(cors());

// Replace with your mongoLab URI
const MONGO_URI =
  'mongodb+srv://lequochung19971:Lequochung12@cluster0.llgmb.mongodb.net/learning-graphql?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

// mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI);
// mongoose.connection
//   .once('open', () => console.log('Connected to MongoLab instance.'))
//   .on('error', (error) => console.log('Error connecting to MongoLab:', error));
const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};
connectDb();
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

module.exports = app;

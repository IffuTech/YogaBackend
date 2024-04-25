const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successfully!");
  } catch (error) {
    console.log("Unable to connect with the database...",error);
  }
};

module.exports = connectToDb;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://yoga123:yoganexprism@cluster0.vgpwvji.mongodb.net/yoga?retryWrites=true&w=majority";
// // const uri = "mongodb://atlas-sql-655b87f2b356930456dfb664-q74mq.a.query.mongodb.net/yoga?ssl=true&authSource=admin";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("successfully connected to MongoDB");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// module.exports = run;
 
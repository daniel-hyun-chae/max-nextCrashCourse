const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://test:test1234@cluster0.qucek.mongodb.net/maxNextCrash?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    await client.connect(async (err) => {
      const db = await client.db();
      const collection = await db.collection("meetups");
      const result = await collection.insertOne(data);
      console.log(result);
      client.close();
      res.status(201).json({ message: "meetup inserted!" });
    });
  }
};

export default handler;

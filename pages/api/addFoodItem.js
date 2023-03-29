import { MongoClient } from 'mongodb';

async function hadnler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      `mongodb+srv://yejin:hyj981017@nextjs-meeting.zmaqtkw.mongodb.net/food-record?retryWrites=true&w=majority`
    );
    const db = client.db();
    const meetupCollection = db.collection('food-item');
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: 'sucees to post card!' });
  }
}

export default hadnler;

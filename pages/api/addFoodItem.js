import { MongoClient } from 'mongodb';
import { getSession } from 'next-auth/client';

async function hadnler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: '지원하지 않는 HTTP method입니다.' });
    return;
  }

  const session = await getSession({ req: req });
  console.log('session: ', session);
  if (!session) {
    res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    return;
  }

  const data = req.body;
  data['writer'] = session.user.name;
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

export default hadnler;

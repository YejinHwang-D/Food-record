import { MongoClient } from 'mongodb';

async function connectToDB() {
  const client = await MongoClient.connect(
    'mongodb+srv://yejin:hyj981017@nextjs-meeting.zmaqtkw.mongodb.net/food-record?retryWrites=true&w=majority'
  );
  return client;
}

export default connectToDB;

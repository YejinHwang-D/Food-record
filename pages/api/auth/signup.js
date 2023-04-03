import connectToDB from '@/lib/db';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: '지원하지 않는 HTTP method입니다.' });
    return;
  }

  const { id, password } = req.body;
  if (!id || !id.includes('@')) {
    res.status(442).json({
      message: '[Error] Invalid input: 이메일 형식이 다릅니다.',
    });
    return;
  }
  if (!password || password.trim().length < 10) {
    res.status(442).json({
      message: '[Error] Invalid input: 비밀번호 입력 양식이 맞지 않습니다.',
    });
    return;
  }

  const client = await connectToDB();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ id: id });
  if (existingUser) {
    res.status(422).json({ message: '해당 아이디의 회원이 존재합니다.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  await db.collection('users').insertOne({
    id: id,
    password: hashedPassword,
  });

  res.status(201).json({ message: '회원이 되신 것을 축하드립니다!' });
  client.close();
}

export default handler;

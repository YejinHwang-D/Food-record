import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import connectToDB from '@/lib/db';
import { comparePassword } from '@/lib/auth';

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDB();
        const db = client.db();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({
          id: credentials.id,
        });

        if (!user) {
          throw new Error('사용자를 찾을 수 없습니다.');
        }

        const isValid = await comparePassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error('비밀번호가 일치하지 않습니다.');
        }
        client.close();
        return { name: user.id };
      },
    }),
  ],
});

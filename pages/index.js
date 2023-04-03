import { Fragment, useState } from 'react';
import { getSession } from 'next-auth/client';
import { MongoClient } from 'mongodb';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Login from '@/component/Login';
import Main from '@/component/Main';

function HomePage(props) {
  const [loginModal, setLoginModal] = useState(false);

  async function addFoodItem(enteredData, onClose) {
    const res = await fetch('/api/addFoodItem', {
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await res.json();
    alert('기록이 맛있게 저장되었어요!');
    onClose();
  }

  function openLoginModal() {
    setLoginModal(true);
  }

  function closeLoginModal() {
    setLoginModal(false);
  }

  return (
    <Fragment>
      <Header onLoginClick={openLoginModal} />
      {loginModal && <Login onClose={closeLoginModal} />}
      <Main data={props.data} onAddItem={addFoodItem} />
      <Footer />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   console.log(req);
// }
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const client = await MongoClient.connect(
    `mongodb+srv://yejin:hyj981017@nextjs-meeting.zmaqtkw.mongodb.net/food-record?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupCollection = db.collection('food-item');
  const result = await meetupCollection
    .find({ writer: session.user.name })
    .toArray();
  client.close();

  return {
    props: {
      data: result.map((val) => ({
        id: val._id.toString(),
        category: val.category,
        food_name: val.food_name,
        date: val.date,
        store_name: val.store_name,
        comment: val.comment,
        image: val.image,
        score: val.score,
        address: null,
      })),
    },
  };
}

export default HomePage;

import { Fragment, useState } from 'react';
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
    const data = await res.json();
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

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://yejin:hyj981017@nextjs-meeting.zmaqtkw.mongodb.net/food-record?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupCollection = db.collection('food-item');
  const result = await meetupCollection.find().toArray();
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
    revalidate: 10,
  };
}

export default HomePage;

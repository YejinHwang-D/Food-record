import { Fragment, useState } from 'react';
import { getSession } from 'next-auth/client';
import { MongoClient } from 'mongodb';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Login from '@/component/Login';
import Main from '@/component/Main';
import useModals from '@/component/custom/useModals';

function HomePage(props) {
  const [loginModal, setLoginModal] = useState(false);

  async function addFoodItem(enteredData, onClose, setMainData) {
    const session = await getSession();
    if (!session) {
      alert(
        '앗! 푸드레코드 회원이 아니시군요? \n회원이 되시면 기록하실수 있어요. :)'
      );
      onClose();
      setLoginModal(true);
    } else {
      const res = await fetch('/api/addFoodItem', {
        method: 'POST',
        body: JSON.stringify(enteredData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await res.json();

      setMainData((prev) => [...prev, enteredData]);
      alert('기록이 맛있게 저장되었어요!');
      onClose();
    }
    URL.revokeObjectURL(enteredData.image);
  }

  const { openModal, closeModal } = useModals();

  const closeLoginModal = () => {
    closeModal(Login);
  };

  const openLoginModal = () => {
    openModal(Login, {
      onClose: closeLoginModal,
    });
  };

  return (
    <Fragment>
      <Header onLoginClick={openLoginModal} />
      <Main data={props.data} onAddItem={addFoodItem} />
      <Footer />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  let result;
  const session = await getSession({ req: context.req });
  const client = await MongoClient.connect(
    `mongodb+srv://yejin:hyj981017@nextjs-meeting.zmaqtkw.mongodb.net/food-record?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupCollection = db.collection('food-item');
  if (session) {
    result = await meetupCollection
      .find({ writer: session.user.name })
      .sort({ date: -1 })
      .toArray();
    client.close();
  } else {
    result = [];
  }

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
        address: val.address,
      })),
    },
  };
}

export default HomePage;

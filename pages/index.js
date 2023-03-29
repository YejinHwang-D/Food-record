import { Fragment, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Login from '@/component/Login';
import Main from '@/component/Main';

const DUMMY_DATA = [
  {
    category: '음료',
    food_name: '오징어볶음',
    store_name: '별내 오징어볶음',
    comment: '맛있고 친절했다. 다음에 또 가긴 갈듯...?',
    score: 5,
    date: '2023.03.06',
    image: null,
    address: '',
  },
  {
    category: '음료',
    food_name: '오징어볶음',
    store_name: '별내 오징어볶음',
    comment: '맛있고 친절했다. 다음에 또 가긴 갈듯...?',
    score: 4,
    date: '2023.03.07',
    image: null,
    address: '',
  },
  {
    category: '음료',
    food_name: '오징어볶음',
    store_name: '별내 오징어볶음',
    comment: '맛있고 친절했다. 다음에 또 가긴 갈듯...?',
    score: 5,
    date: '2023.03.08',
    image: null,
    address: '',
  },
  {
    category: '음료',
    food_name: '오징어볶음',
    store_name: '백반집',
    comment: '그냥 그랬다.. 가격이 너무 비쌌음.',
    score: 3,
    date: '2023.03.09',
    image: null,
    address: '',
  },
  {
    category: '음료',
    food_name: '오징어볶음',
    store_name: '별내 오징어볶음',
    comment: '불친절했음 ㅠㅠ',
    score: 1,
    date: '2023.03.10',
    image: null,
    address: '',
  },
  {
    category: '음료',
    food_name: '오징어볶음',
    store_name: '별내 오징어볶음',
    comment: '맛있고 친절했다. 다음에 또 가긴 갈듯...?',
    score: 5,
    date: '2023.03.11',
    image: null,
    address: '',
  },
];

function HomePage(props) {
  const [loginModal, setLoginModal] = useState(false);

  async function addFoodItem(enteredData, onClose) {
    console.log('addFoodItem!!: ', enteredData);
    const res = await fetch('/api/addFoodItem', {
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);
    onClose();
  }

  function openLoginModal() {
    setLoginModal(true);
  }
  const closeLoginModal = () => {
    setLoginModal(false);
  };

  return (
    <Fragment>
      <Header onLoginClick={openLoginModal} />
      {loginModal && <Login onClose={closeLoginModal} />}
      <Main data={props.data} onAddItem={addFoodItem} />
      <Footer />
    </Fragment>
  );
}

export function getStaticProps() {
  return {
    props: {
      data: DUMMY_DATA,
    },
    revalidate: 1,
  };
}

export default HomePage;

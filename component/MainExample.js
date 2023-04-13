import { Fragment } from 'react';
import CardView from './Card';

const DUMMY_DATA = [
  {
    address: {},
    category: '음료',
    comment: '오늘을 함께한 음료는 무엇인가요?',
    date: '2023-04-15',
    food_name: '카페라떼',
    id: '1',
    image: {},
    score: '5',
    store_name: '',
  },
  {
    address: {},
    category: '식사',
    comment: '어떤 맛있는 식사를 하셨나요?',
    date: '2023-04-14',
    food_name: '맛있는 백반',
    id: '2',
    image: {},
    score: '4',
    store_name: '',
  },
  {
    address: {},
    category: '디저트',
    comment: '무슨 디저트를 드셨나요?',
    date: '2023-04-13',
    food_name: '애플파이',
    id: '3',
    image: {},
    score: '5',
    store_name: '',
  },
];

function MainExample() {
  return (
    <Fragment>
      {DUMMY_DATA.map((value, index) => {
        return <CardView value={value} key={index} style={true} />;
      })}
    </Fragment>
  );
}

export default MainExample;

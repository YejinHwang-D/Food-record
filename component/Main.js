import { useState, useMemo } from 'react';
import CardView from '@/component/Card';
import Dialog from './Dialog';
import Plus from '../assets/plus-solid.svg';
import Search from '../assets/magnifying-glass-solid.svg';
import classes from './Main.module.css';
import useModals from './custom/useModals';

function Main(props) {
  const [mainData, setMainData] = useState(props.data);
  const [search, setSearch] = useState({
    category: '',
    keyword: '',
  });
  const [filtering, setFiltering] = useState({
    category: '',
    rating: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  }

  const { openModal, closeModal } = useModals();
  const closeAddModal = () => {
    closeModal(Dialog);
  };

  const openAddModal = () => {
    openModal(Dialog, {
      onAddItem: props.onAddItem,
      onClose: closeAddModal,
      setMainData: setMainData,
    });
  };

  function filterChange(e) {
    console.log(e.target.value, e.target.name);
    const { name, value } = e.target;
    setFiltering({
      ...filtering,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch({
      ...search,
      category: '',
      keyword: '',
    });
  };

  function makeCardList() {
    return mainData.map((ele, index) => {
      return filtering.category === '' ? (
        filtering.rating <= ele.score ? (
          <CardView value={ele} key={index} />
        ) : null
      ) : filtering.category === ele.category &&
        filtering.rating <= ele.score ? (
        <CardView value={ele} key={index} />
      ) : null;
    });
  }
  const CardList = useMemo(() => {
    return makeCardList();
  }, [mainData]);

  return (
    <main className={classes.main}>
      <div className={classes.main_text}>
        <span>오늘도 맛있는 음식을 드셨나요?</span>
        <span>
          아침, 점심, 저녁, 그리고 디저트까지 오늘 먹은 음식을 기록해보세요!
        </span>
      </div>
      <div className={classes.main_add}>
        <Plus className={classes.plus_icon} onClick={openAddModal} />
      </div>
      <div className={classes.main_search}>
        <select
          required
          value={search.category}
          name="category"
          onChange={handleChange}
        >
          <option value="" disabled>
            카테고리명
          </option>
          <option value="식사">식사</option>
          <option value="음료">음료</option>
          <option value="디저트">디저트</option>
        </select>
        <div>
          <input
            placeholder="원하는 키워드를 입력해주세요."
            name="keyword"
            onChange={handleChange}
            value={search.keyword}
          ></input>
          <button type="submit" onClick={handleSubmit}>
            <Search className={classes.search_icon} />
          </button>
        </div>
      </div>
      <div className={classes.card_view}>
        <div className={classes.filter_section}>
          <select
            name="category"
            value={filtering.category}
            onChange={filterChange}
          >
            <option value="" disabled>
              카테고리명
            </option>
            <option value="식사">식사</option>
            <option value="음료">음료</option>
            <option value="디저트">디저트</option>
          </select>
          <select name="rating" onChange={filterChange}>
            <option value={5}>⭐️⭐️⭐️⭐️⭐️</option>
            <option value={4}>⭐️⭐️⭐️⭐️ 이상</option>
            <option value={3}>⭐️⭐️⭐️ 이상</option>
            <option value={2}>⭐️⭐️ 이상</option>
            <option value={1}>⭐️ 이상</option>
          </select>
        </div>
        <div className={classes.card_section}>{CardList}</div>
      </div>
    </main>
  );
}

export default Main;

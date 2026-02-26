import Header from '../components/Header';
import MainPageItem from '../components/MainPageItem'
import './Main.css';
import { useNavigate } from 'react-router-dom';
import CartIcon from '../components/CartIcon';
import { useContext, useEffect, useState } from 'react';
import { CartItemsContext } from '../App';
import Search from '../components/Search';
import CheckBox from '../components/CheckBox';
import Loading from './Loading';


function Main() {

  // 로딩 상태
  const [isLoaded, setIsLoaded] = useState(false);

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 카테고리 상태 관리
  const { dataList, categories, cartItems } = useContext(CartItemsContext);

  // 카테고리 선택에 따라 분류된 상품 배열입니다.
  const [categorizedItemList, setCategorizedItemList] = useState(dataList);

  // 검색어에 따라 분류된 상품 배열입니다.
  const [searchedItemList, setSearchedItemList] = useState([]);

  // 어느 순서로 분류할지 결정합니다. "STARS", "PRICE_LOW", "PRICE_HIGH", "ALPHABET"이 있습니다.
  const [order, setOrder] = useState("PRICE_LOW");

  // 카테고리에 따라 상품을 분류했다면 검색어에 따른 분류도 초기화합니다.
  useEffect(() => {
    setSearchedItemList(categorizedItemList);
  }, [categorizedItemList]);

  // 렌더링이 다 일어났을 때 로딩도 끝납니다.
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });
  }); 


  /* 함수 선언 */

  // 카테고리의 체크 상태가 변하면 카테고리 상태를 업데이트하는 함수
  const onChangeCheck = (categoryState) => {
    setCategorizedItemList(dataList.filter(item => {
      let isIncluded = false;
      for (const category_name in categoryState) {
        if (categoryState[category_name] && category_name === item.category) {
          isIncluded = true;
        }
      }
      return isIncluded;
    }));
  }

  // 검색을 눌렀을 때 상품을 검색하는 함수
  const onClickSearch = (value) => {
    setSearchedItemList(categorizedItemList.filter(item => item.title.toLowerCase().includes(value.toLowerCase())));
  }

  // 정렬 순서 변화 시 상품 정렬하는 함수
  const onChangeOrder = (e) => {
    setOrder(e.target.value);
  }


  /* 화면 제작 */

  // 순서 정렬
  let itemLayout;
  switch (order) {
    default:
    case "STARS":
      itemLayout = searchedItemList.sort((a, b) => Number(b.stars) - Number(a.stars));
      break;
    case "PRICE_HIGH":
      itemLayout = searchedItemList.sort((a, b) => Number(b.unitPrice) - Number(a.unitPrice));
      break;
    case "PRICE_LOW":
      itemLayout = searchedItemList.sort((a, b) => Number(a.unitPrice) - Number(b.unitPrice));
      break;
    case "ALPHABET":
      itemLayout = searchedItemList.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
      break;
  }

  // 로딩이 끝났으면 상품을 나열합니다.
  if (isLoaded)
    return (
      <div className='Main'>

        {/* 헤더 */}
        <Header
          title="도깨비 쇼핑몰"
          rightChild={<CartIcon itemCount={cartItems.length} onClick={() => navigate("/cart")} />}
        />

        {/* 검색창 */}
        <div className="search">
          <Search placeholder={"상품 검색..."} onClick={onClickSearch} />
        </div>

        {/* 카테고리 체크박스 */}
        <div className='categories'>
          <h2>카테고리</h2>
          <CheckBox
            initialCheckState={categories.reduce((acc, category_name) => { acc[category_name] = true; return acc; }, {})}
            onChange={onChangeCheck}
          />
        </div>

        {/* 상품 정렬 순서 */}
        <div className='order'>
          <select onChange={onChangeOrder}>
            <option value="PRICE_LOW">가격 낮은 순</option>
            <option value="PRICE_HIGH">가격 높은 순</option>
            <option value="STARS">별점순</option>
            <option value="ALPHABET">이름순</option>
          </select>
        </div>

        {/* 상품 리스트 */}
        <div className="item_list">
          {itemLayout.map(item =>
            <MainPageItem
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.unitPrice}
              stars={item.stars}
              onClick={() => navigate(`/detail/${item.id}`)}
            />)
          }
        </div>
      </div>
    );
  else  // 아직 로딩 중인 경우 로딩 페이지를 띄웁니다.
    return <Loading />
}

export default Main;
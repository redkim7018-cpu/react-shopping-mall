import './App.css';
import { createContext, useMemo, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import initializeData from './utils/initializeData';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Purchased from './pages/Purchased';
import NoPageFound from './pages/NoPageFound';

// 장바구니 관련 값들을 하위 컴포넌트에 넘겨주기 위해 Context를 생성합니다.
export const CartItemsContext = createContext();

function App() {

  // 전체 상품 데이터 배열을 불러옵니다.
  // 접속 시 한 번만 불러오면 되므로 최적화를 해 줍니다.
  const { dataList, categories } = useMemo(
    () => initializeData()
    , []);

  // 배열에 담긴 각 데이터 객체의 구조는 다음과 같습니다.
  // id: 상품 ID
  // image: 상품 이미지 URL
  // title: 상품 제목
  // unitPrice: 상품 가격
  // description: 상품 설명
  // stars: 상품 평점
  // category: 상품 카테고리 이름

  // 장바구니에 담긴 각 데이터 객체에는 다음 프로퍼티 하나가 더 붙습니다:
  // count: 상품 개수


  // 장바구니에 담긴 상품 배열을 수정할 함수입니다.
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":  // 새 상품을 담습니다. 상품은 action.data에 담겨 있습니다.
        const duplicate = state.find(item => item.id === action.data.id); // 중복된 상품이 있는지 확인합니다.
        if (duplicate) {  // 중복된 상품이 있다면, 해당 상품에 개수를 추가합니다.
          return [...state.filter(item => item.id !== action.data.id), { ...duplicate, count: duplicate.count + action.data.count }];
        } else {  // 중복된 상품이 없다면, 장바구니에 새로 추가합니다.
          return [...state, action.data];
        }
      case "DELETE":  // 상품을 장바구니에서 빼냅니다. 해당 상품의 ID는 action.id에 저장되어 있습니다.
        return state.filter(item => item.id !== action.id);
      case "CLEAR":  // 장바구니를 비웁니다.
        return [];
      default:
        return state;
    }
  }

  // 장바구니에 담긴 상품 배열을 만들고, 위 함수를 사용해 useRedcuer로 상태 관리를 합니다.
  const [cartItems, dispatch] = useReducer(reducer, []);

  return (
    <div className="App">
      <CartItemsContext.Provider value={{ dataList, categories, cartItems, dispatch }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchased" element={<Purchased />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </CartItemsContext.Provider>
    </div>
  );
}

export default App;
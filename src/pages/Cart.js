import CartPageItem from "../components/CartPageItem";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartItemsContext } from "../App";
import "./Cart.css"
import priceFormatter from "../utils/priceFormatter";


/**
 * 장바구니 페이지
 */
const Cart = () => {

  // 페이지 이동 함수
  const nav = useNavigate();

  // 장바구니 데이터를 가져옵니다.
  const { cartItems, dispatch } = useContext(CartItemsContext)

  // 장바구니에 담긴 상품을 삭제하는 함수
  const onClickDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch({
        type: "DELETE",
        id
      });
    }
  }

  // 결제하는 함수
  const onClickPurchase = () => {
    if (cartItems.length === 0)
      window.alert("장바구니에 담긴 상품이 없습니다!");
    else if (window.confirm("결제하시겠습니까?")) {
      nav("/purchased");
    }
  }


  // 총 가격 계산
  // reduce를 사용해서 배열의 모든 상품(unitPrice * count)을 합산
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.count,
    0
  );

  // 페이지 스크롤 위로 올리기
  window.scrollTo(0, 0);

  return (
    <div className="Cart">

      {/* 헤더 */}
      <Header
        title="도깨비쇼핑몰"
        leftChild={<Button
          type="back"
          text="⇦"
          onClick={() => nav(-1)}

        />}
      />

      {/* 페이지 제목 */}
      <h2>🛒 쇼핑카트</h2>

      {/* 장바구니에 담긴 상품 나열 */}
      {cartItems.map((item) => (
        <CartPageItem
          key={item.id}               // React key (고유 id 필요)
          image={item.image}          // 상품 이미지
          title={item.title}          // 상품명
          count={item.count}          // 상품 수량
          unitPrice={item.unitPrice}  // 상품 단가
          isDeletable={true}          // 삭제 버튼 표시 여부 (항상 true)
          onDelete={() => onClickDelete(item.id)}
        />
      ))}

      {/* 총 가격 표시 */}
      <div className="total_price">
        총 가격 : ${priceFormatter(totalPrice)}

        {/* 결제 버튼 */}
        <Button className="button_payment"
          type="payment"
          text="결제하기"
          onClick={onClickPurchase}
        />
      </div>
    </div>
  );
};

export default Cart;
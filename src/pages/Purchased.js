import Button from "../components/Button";
import CartPageItem from "../components/CartPageItem";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import "./Purchased.css";
import { useContext } from "react";
import { CartItemsContext } from "../App";
import priceFormatter from "../utils/priceFormatter";

/**
 * 구매 완료 페이지입니다.
 */
const Purchased = () => {

    // 페이지 이동 함수
    const nav = useNavigate();

    // 장바구니 데이터를 가져옵니다.
    const { cartItems, dispatch } = useContext(CartItemsContext);

    // 총 가격 계산
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].count * cartItems[i].unitPrice;
    }

    // 페이지 스크롤 위로 올리기
    window.scrollTo(0, 0);

    return (
        <div className="Purchased">

            {/* 헤더 */}
            <Header title="도깨비 쇼핑몰"/>

            {/* 주문 완료 문구 */}
            <div className="thanks">주문이 완료되었습니다</div>

            <div className="item_wrapper">
                {/* 결제한 상품 리스트 (장바구니 상품 리스트) */}
                {cartItems.map((item) =>
                    <CartPageItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        count={item.count}
                        unitPrice={item.unitPrice}
                        isDeletable={false}
                    />
                )}
            </div>

            {/* 결제 금액 문구 */}
            <div className="confirm" >{`결제금액 $${priceFormatter(totalPrice)} 입니다`}</div>
            
            {/* 홈으로 이동 버튼 */}
            <Button text="홈으로 이동" type="home" onClick={() => {
                nav("/", {replace: true});      // 뒤로 가고
                dispatch({ type: "CLEAR" });    // 장바구니 비우기
            }} />
        </div>
    );
};

export default Purchased;
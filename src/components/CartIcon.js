import "./CartIcon.css";
import Button from "./Button"



/** 속성: 카트 버튼 및 카트(장바구니)에 들어간 아이템 수 베치(badge)
 * 버튼 컴포넌트 중 카트 cart 아이콘이 밑 badge을 수식합니다.
 * 버튼은 안에 들어갈 카트는 CartIcon.js 파일에 수식되어 있습니다.
 * 밑에 있는 베치의 수는 itemcount로 정리 되어 있으며
 * app.js에 있는   "<CartIcon itemCount={0}/>" 에 현재 숫자 0으로 되어 있습니다.
 */


/**
 * CartIcon이 어떤 컴포넌트인지 페이지 우특 상단에 올라갈 장바구니 페이지  
 * itemCount: 제품의 수. 숫자를 넣어주세요.  
 * onClick: 클릭했을 때 실행할 함수.  
 */
const CartIcon = ({ itemCount, onClick }) => {

    return (
        <div className="CartIcon">
            <Button text="🛒" type="cart" onClick={onClick} />
            {
                itemCount > 0 &&
                <div className="count">
                    {Number(itemCount)}
                </div>
            }
        </div>
    );
};

export default CartIcon;
import "./CartPageItem.css";
import Button from "./Button";
import priceFormatter from "../utils/priceFormatter";

/**
* 
  -장바구니 페이지에서 개별 상품을 보여주는 UI 블록입니다.   
    즉, 장바구니 안의 "한 아이템(카드)"을 담당하는 컴포넌트입니다. 

*전달 값  
 * image: 상품 이미지 URL : 문자열(string)  
 * title: 상품 이름 : 문자열(string)  
 * count: 상품 수량 : 숫자(number)  
 * unitPrice: 상품 단가 : 숫자(number)  
 * isDeletable: 삭제 버튼 표시 여부 (true/false) : 불리언(boolean)  
 * onDelete: 삭제 버튼 클릭 시 실행할 함수 : 함수(function)  
 */
const CartPageItem = ({ image, title, count, unitPrice, isDeletable, onDelete }) => {

  return (
    <div className="CartPageItem">
      {/* 상품 이미지 */}
      <div className="item_image">
        <img src={image} alt={title} />
      </div>

      {/* 상품 정보 */}

      <div className="item_body">
        <div className="item_title">{title}</div>
        <div className="item_info">
          <div className="item_count">수량: {count} 개</div>
          <div className="item_price">가격: ${priceFormatter(unitPrice * count)}</div>
        </div>

        {/* 삭제 버튼 (isDeletable이 true일 때만 보임) */}
        {isDeletable && (
          <div className="item_action">
            <Button
              text="삭제"
              type="remove"
              onClick={onDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPageItem;
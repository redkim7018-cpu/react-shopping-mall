import './Button.css';

/**
 * 버튼 컴포넌트입니다.  
 * type: 버튼의 종류입니다.
 * cart(장바구니),
 * back(뒤로가기),
 * addToCart(장바구니에 담기),
 * remove(삭제하기),
 * payment(결제하기), 
 * home(홈으로)
 * 이 중 하나를 문자열로 적어 넣으세요.  
 * <br>text: 버튼 위에 띄울 글자를 문자열로 적어 넣으세요.  
 * <br>onClick: 버튼을 클릭하면 실행할 함수를 넣어 주세요.
 */
const Button = ({type, text, onClick}) => {

    // type은 class 이름 안에 저장되고, CSS가 class 이름에 따라 버튼 디자인을 결정합니다.
    // text는 컴포넌트 실행시 입력되는 문자열입니다. 
    // onClick은 버튼이 클릭되었을때 실행되는 함수입니다.
    return(
        <div className='Button'>
            <button className={`button button_${type}`} onClick={onClick}>{text}</button>
        </div>
    );
};

export default Button;
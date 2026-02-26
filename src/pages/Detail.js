import './Detail.css';
import Header from '../components/Header';
import Button from '../components/Button';
import CartIcon from "../components/CartIcon";
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartItemsContext } from "../App"
import priceFormatter from '../utils/priceFormatter';

const Detail = () => {

    // 페이지 이동 함수
    const nav = useNavigate();

    // URL의 id 부분을 가져옵니다.
    const params = useParams();

    // 상품 리스트와 장바구니 데이터를 가져옵니다.
    const { dataList, cartItems, dispatch } = useContext(CartItemsContext)

    // id를 통해 해당 상품의 데이터를 가져옵니다.
    const data = dataList.find(item => item.id === params.id);

    // 상품 개수
    const [quantity, setQuantity] = useState(1);

    // 상품 개수 수정하는 함수
    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    }

    // 총 가격
    const totalPrice = data.unitPrice * quantity;

    // 장바구니에 담을 때 실행하는 함수
    const onClickAddToCart = () => {

        // 장바구니에 이미 있는 상품이면 확인 메시지를 띄웁니다.
        if (!cartItems.find(item => item.id === params.id)
            || window.confirm("이미 장바구니에 담긴 상품입니다. 계속해서 담으시겠습니까?")) {
        
            // 장바구니에 상품을 추가합니다.
            dispatch({
                type: "ADD",
                data: { ...data, count: quantity }
            })

            alert("장바구니에 담겼습니다.");

            // 뒤로 가기
            nav(-1);
        }
    }

    return (
        <div className='Detail'>

            {/* 헤더 */}
            <Header
                title="도깨비 쇼핑몰"
                leftChild={<Button text={"⇦"} type="back" onClick={() => nav(-1)} />}
                rightChild={<CartIcon itemCount={cartItems.length} onClick={() => nav("/cart")} />}
            />

            {/* 상세 페이지 */}
            <div className='wrapper'>

                {/* 상품 이미지 */}
                <img src={data.image} alt={`Product: ${data.id}`}/>

                <div className='content'>

                    {/* 상품 이름 */}
                    <h3 className='title'>{data.title}</h3>

                    {/* 상품 가격 */}
                    <div className='price'>${priceFormatter(data.unitPrice)}</div>

                    {/* 상품 설명 */}
                    <div className='description'>{data.description}</div>

                    {/* 상품 개수 */}
                    <div className='quantity_wrapper'>
                        <span>수량: </span>
                        <select value={quantity} onChange={handleQuantityChange} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                    
                    <div className='bottom_section'>

                        {/* 총 가격 */}
                        <h4 className='totalPrice'>총 가격: ${priceFormatter(totalPrice)}</h4>

                        {/* 장바구니에 담기 버튼 */}
                        <Button type="addToCart" onClick={onClickAddToCart} text='장바구니 담기' />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Detail;
import './MainPageItem.css'
import priceFormatter from '../utils/priceFormatter';

/**
 * mainPageItem은 메인 페이지에 띄울 상품 컴포넌트입니다.    
 * image는 MainPageItem에 들어가는 이미지이며 문자열을 줘야 합니다.   
 * title은 MainPageItem의 상품 이름이며 문자열을 줘야 합니다.  
 * price는 MainPageItem의 가격이며 숫자를 줘야 합니다.  
 * onClick함수는 MainPageItem을 클릭했을때 그 상품의 상세 구매 페이지로 넘어가는 함수입니다.
 */
const MainPageItem = ({ image, title, price, stars, onClick }) => {
    //MainPageItem에 펑션을 사용해 함수들을 불러옵니다.(image, title, price, stars, onClick)

    const renderStars = (rating) => {
        const totalStars = 5;   //총 별의 개수를 5개로 정합니다.
        const roundedRating = Math.round(rating); // 1 단위로 반올림을 하는 함수입니다.

        let starOutput = [];    //별을 담을 비어있는 배열입니다.

        // 꽉 찬 별 추가
        for (let i = 0; i < roundedRating; i++) {   // 반올림된 별 개수만큼 하나씩 별을 채웁니다.
            starOutput.push('★');
        }

        // 빈 별 추가
        const emptyStarCount = totalStars - starOutput.length;  // 전체 별 5개중에 채워진 별의 개수를 빼서 비어있는 별의 개수를 계산합니다.
        for (let i = 0; i < emptyStarCount; i++) {  // 계산된 비어있는 별의 개수만큼 채웁니다.
            starOutput.push('☆');
        }

        return starOutput.join(''); // 별들을 모두 합쳐 문자열로 반환합니다.
    };

    return (
        <div className="MainPageItem" onClick={onClick}>
            {/*MainPageItem의 전체 구성이고 onClick버튼을 이용해 상품 상세 페이지로 넘어가게 만듭니다.*/}

            <div className='image_section'>

                {/* 상품의 이미지입니다. src={image}는 위에서 받아온 image라는 정보를 이 이미지에 넣어줍니다. */}
                <img src={image} alt="" />

            </div>

            {/* 상품의 이름입니다. */}
            <div className="title">{title}</div>    

            {/* 상품의 별점입니다. 위에서 만든 renderStars 함수를 이용해서 별점을 보여주고, 옆에 괄호로 숫자를 같이 표시합니다. */}
            <div className='stars'>{renderStars(stars)} ({stars})</div>

            {/* 상품의 가격입니다. Number(price).toFixed(2)는 받아온 가격을 소수점 둘째 자리까지 표시해 줍니다. */}
            <div className="price">${priceFormatter(price)}</div>
        </div>
    );
}

export default MainPageItem;
import dataset from "../dataset/dataset.json";

/**
 * 전체 상품 데이터(dataList)와, 전체 상품 카테고리들(categories)을 가져오는 함수입니다.    
 * dataList: image(이미지 URL), title(상품 이름), unitPrice(가격), description(설명),
 * stars(별점), category(카테고리명)이 들어있는 객체들을 배열로 반환합니다.  
 * categories: 상품의 카테고리 이름들을 문자열로 각각 저장한 배열을 반환합니다.
 */
const initializeData = () => {

    let dataList = [];
    let categories = [];

    dataset.forEach(item => {
        dataList.push({
            id: item.asin,
            image: item.imgUrl,
            title: item.title,
            unitPrice: item.price,
            description: "가격이 저렴하고 품질이 좋은 상품입니다.",
            stars: item.stars,
            category: item.major_category
        })

        if (!categories.includes(item.major_category))
            categories.push(item.major_category);
    });

    return { dataList, categories };
}

export default initializeData;
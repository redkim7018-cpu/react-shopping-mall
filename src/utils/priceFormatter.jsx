  const formatter = new Intl.NumberFormat('en-US', {
    // style: 'decimal', // 기본값
    minimumFractionDigits: 2, // 최소 소수점 자릿수
    maximumFractionDigits: 2, // 최대 소수점 자릿수
  });

  /**
   * 가격을 적절한 문자열로 표시해줍니다. 안에 가격(Number)을 넣으면 문자열을 반환합니다.  
   * 예) 12345.6 => 12,345.60
   */
  const priceFormatter = (price) => {
    return formatter.format(price);
  }

  export default priceFormatter;
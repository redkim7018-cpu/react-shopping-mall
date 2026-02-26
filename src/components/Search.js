import "./Search.css";
import Button from "./Button";
import { useState } from "react";

/**
 * 검색 컴포넌트입니다. 검색 버튼을 누르거나 엔터 키를 누르면 전달한 함수를 실행합니다.  
 * placeholder: 검색창에 띄울 placeholder입니다. 문자열입니다.  
 * onClick: 클릭 시 검색어를 가지고 실행할 함수입니다. '(검색어 변수) => {}' 형식의 함수를 넣어야 합니다.
 */
const Search = ({ placeholder, onClick }) => {

    // 검색어
    const [searchValue, setSearchValue] = useState("");

    // 검색 버튼 눌렀을 때 실행할 함수
    const handleClick = () => {
        if (searchValue) {
            onClick(searchValue); // 부모에서 전달받은 콜백 실행
            setSearchValue("");
        }
    };

    // 검색어 실시간 반영하는 함수
    const onChange = (e) => {
        setSearchValue(e.target.value);
    }

    // 엔터 키 눌렀을 때 실행할 함수
    const handleKeyDown = (e) => {        
        if (e.keyCode === 13) { // Enter
            handleClick();      // 검색 버튼을 누른 것과 동일한 기능 수행
        }
    }
    
    return (
        <div className="Search">

            {/* 검색창 */}
            <input value={searchValue} placeholder={placeholder} onKeyDown={handleKeyDown} onChange={onChange}/>

            {/* 검색 버튼 */}
            <Button type="home" text="검색" onClick={handleClick} />
        </div>
    )
};

export default Search;
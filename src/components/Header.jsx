import "./Header.css";
import { useNavigate } from "react-router-dom";

/**
 * 헤더 컴포넌트입니다.  
 * leftChild: 왼쪽 컴포넌트  
 * title: 제목 문자열  
 * rightChild: 오른쪽 컴포넌트  
 */
const Header = ({ leftChild, title, rightChild }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="Header">
                <div className="leftChild">
                    {leftChild}
                </div>
                <div className="title" onClick={() => navigate("/") /* 홈으로 */ }>
                    {title}
                </div>
                <div className="rightChild">
                    {rightChild}
                </div>
            </div>
            <div className="header-gap-bottom"></div>
        </>
    )
};

export default Header;
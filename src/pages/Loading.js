import Header from "../components/Header";
import "./Loading.css";

/**
 * 로딩 시 띄울 화면입니다.
 */
const Loading = () => {
    return (
        <div className="Loading">
            <Header title="도깨비 쇼핑몰" />
            <div className="notice">페이지를 불러오는 중입니다.<br />잠시만 기다려 주세요...</div>
        </div>
    );
};

export default Loading;
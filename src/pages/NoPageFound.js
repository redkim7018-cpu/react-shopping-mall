import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./NoPageFound.css";
import Button from "../components/Button";

/**
 * 잘못된 페이지
 */
const NoPageFound = () => {

    const navigate = useNavigate();

    return (
        <div className="NoPageFound">
            <Header title="도깨비 쇼핑몰" />
            <div className="contents">
                <img src="https://i.namu.wiki/i/vvZTNF9QwX_lyah1A4HFjdSBWsUrpWU27fCPcS89s_fxQj-mq7mCYcutWGXb9SIPWO3WYInz2o33pSfQSDKBRx6unAf-TIe_AQggTZm2vt0_cVt7eMcXezQ23BFodqxXXpiCrdolpz24XP4IujfpEQ.webp" alt="404 NOT FOUND"></img>
                <div className="notice">페이지를 찾을 수 없습니다.</div>
                <Button type="home" text="홈으로" onClick={() => navigate("/", { replace: true })} />
            </div>
        </div>
    );
};

export default NoPageFound;
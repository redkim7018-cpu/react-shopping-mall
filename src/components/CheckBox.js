import { useRef, useState } from "react";
import Button from "../components/Button"
import "./CheckBox.css";

/**
 * 받은 데이터로 체크박스를 만들고, 현재 체크된 상태를 알려주는 컴포넌트입니다.  
 *   
 * initialCheckState: 체크박스를 만들 데이터 객체입니다.  
 * 객체 안에는 '[체크박스 이름]: 체크 여부(불리언)' 형태의 프로퍼티-값 쌍이 들어 있습니다.
 *   
 * onChange: 체크 상태가 변했을 때 실행하는 함수입니다.  
 * ( checkState ) => {} 형식의 함수를 넣어주어야 하며,  
 * checkState에는 initialCheckState와 구조가 같으나 변경된 체크 상태에 의해 값만 달라진 객체가 전달됩니다.
 *   
 * 사용법 예시:  
 * <CheckBox categories={{ ['의류']: true, ['가전']: false }} onChange={ (checkState) => { console.log(checkState) } } />
 */
const CheckBox = ({ initialCheckState, onChange }) => {

    // 체크박스 요소 id입니다.
    const id = useRef(0);

    // 체크박스 상태를 받아와 저장합니다.
    const [state, setState] = useState(initialCheckState);

    // 체크 input 중 하나를 직접 눌렀을 때 실행할 함수
    const onClickChange = (e) => {

        const changedState = { ...state, [e.currentTarget.name]: e.currentTarget.checked };
        setState(changedState);
        onChange(changedState);
    }   

    // 체크박스 중 하나를 눌렀을 때 실행할 함수 (기능은 onClickChange와 동일)
    const onClickCategory = (e) => {

        const changedState = { ...state, [e.currentTarget.id]: !state[e.currentTarget.id] };
        setState(changedState);
        onChange(changedState);
    }

    // 전체 토글 버튼을 눌렀을 때 실행할 함수
    const onClickAllToggle = () => {

        // 하나라도 체크가 해제되어 있는지 확인합니다.
        let isAllChecked = true;
        for (const category_name in state) {
            if (!state[category_name]) {
                isAllChecked = false;
                break;
            }
        }

        // 전부 체크되어 있으면 전부 해제를, 그렇지 않으면 전부 체크를 합니다.
        const changedState = Object.keys(state).reduce((acc, category_name) => { acc[category_name] = !isAllChecked; return acc; }, {});
        setState(changedState);
        onChange(changedState);
    }

    return (
        <div className="CheckBox">
            {
                // 체크박스 나열
                Object.keys(state).map((category_name) =>
                    <div className="item" id={category_name} key={id.current++} onClick={onClickCategory}>
                        <input
                            type="checkbox"
                            name={category_name}
                            onChange={onClickChange}
                            checked={state[category_name]} />
                        <span className="name">{category_name}</span>
                    </div>)
            }

            {/* 전체 토글 버튼 */}
            <Button type="home" text="전체 토글" onClick={onClickAllToggle} />
        </div>
    )
};

export default CheckBox;
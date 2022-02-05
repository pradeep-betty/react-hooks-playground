import React, { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";

import './styles.css';

const UseLayoutEffect1 = () => {
    const divRef = useRef();
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState('hello');

    useLayoutEffect(() => {
        console.log('useLayoutEffect: 10');
        setValue1(10);
    });


    useEffect(() => {
        console.log('useEffect: 20');
        setValue1(20);
        // setValue2('hi');
    });

    const render = () => {
        console.log('rendered', value1, value2);
        return (
            <div className="containerDiv" id='conteinerDiv' ref={divRef}>
                useEffect vs useLayoutEffect value {value1} & {value2}
            </div>
        )
    };

    return render();
}
export default UseLayoutEffect1;
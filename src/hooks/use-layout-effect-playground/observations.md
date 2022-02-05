bbased on the below code, the following are observerd
    1. observed o/p:
        > rendered 0
        > useLayoutEffect: 10
        > useEffect: 20
        > rendered 20
    2. definitions:
       1. react renders the first time with state <value> 0, without calling both <useLayoutEffect> & <useEffect>
       2. react then calls <useLayoutEffect>, which sets State <value> to 10
       3. but react didn't render the dom yet (strangely)
       4. instead it calls <useEffect>, which then sets State <value> to 20
       5. react now renders the dom with state <value> 20
    3. observed o/p after removing <useEffect>
        > rendered 0
        > useLayoutEffect: 10
        > rendered 10 
    5. definitions:
       1. react renders the first time with state <value> 0, without calling the <useLayoutEffect>
       2. react then calls the <useLayoutEffect>, which sets State <valule> to 10
       3. react now renders the dom with state <value> 10.
    6. possible explanation (may be wrong):
       1. may be react after calling <useLayoutEffect> sees the <useEffect> waiting to set the <same> state <Value>
       2. so to avoid rerender it waits for useEffect to finish and update the render only one
    7. conclusion:
       1. if <useLayoutEffect> & <useEffect> are setting a same state <value>, the <useEffect>'s value is given precedence and it is used to redder the dom
       2. if <useLayoutEffect> & <useEffect> are setting a different state <value>, then both of their state updates are rendered in the dom
       3. <useLayoutEffect>'s values are replaced by the <useEffect>'s values before the dom-render.
       4. which means <useLayoutEffect> litrelly has no use over <useEffect> with respect to state updates,
       5. however, <useLayoutEffet> SHINES when it comes to dom-manipulations / painting in the browser, when use in conjunction with useRef/
          1. Example
             > const myDivRef = useRef(); <div id="myDiv" ref={myDivRef} style={{backgroundColor:black}}> </div>
             > useEffect(()=>{ myDivRef.current.style.backgroundColor = 'red' }, [])            
                // <- this above useEffect update will causes a flicker as the dom is already rendered
             > useLayoutEffect(()=>{ myDivRef.current.style.backgroundColor = 'yellow' }, [])   
                // <- this doesn't cause the flicker as it applies it before the dom redner
        6. so as the name implies, its better suited for painting & dom-manipulations without flicker

```
import React, { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";

import './styles.css';

const UseLayoutEffect1 = () => {
    const divRef = useRef();
    const [value, setValue] = useState(0);


    useLayoutEffect(() => {
        console.log('useLayoutEffect: 10');
        setValue(10);
    }, []);


    useEffect(() => {
        console.log('useEffect: 20');
        setValue(20);
    }, []);


    const render = () => {
        console.log('rendered', value);
        return (
            <div className="containerDiv" id='conteinerDiv' ref={divRef}>
                useEffect vs useLayoutEffect value {value}
            </div>
        )
    };

    return render();
}
export default UseLayoutEffect1;
```
import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [toggle, setToggle] = useState(undefined);
  const [counter1, setCounter1] = useState(undefined);
  const [counter2, setCounter2] = useState(undefined);
  const [counter3, setCounter3] = useState(undefined);
  const [renderCount, setRenderCount] = useState(undefined);

  /** useEffect:
   *  -> default behaviour : it runs whenever there is an init or a change in the state of the function
   *  -> we can change this behaviour
   *      1) we can leverage the default behavour and ask it to run whenever there is an 
   *          init or a change of any state/props of the function
   *      2) we can ask it to run
   *  
   * 
   */

  useEffect(() => {
    console.log("first render : component mounted");
  }, []); //<- useEffect will run whenever there is a change

  useEffect(() => {
    console.log(`EFFECT : fired on init/change of toggle <${toggle}>`);

    let newValue = (counter1 || -1) + 1;
    setCounter1(newValue);
    console.log(
      `------------> counter-1 changed (from ${counter1} into ${newValue})`
    );

    newValue = (counter2 || -1) + 1;
    setCounter2(newValue);
    console.log(
      `------------> counter-2 changed (from ${counter2} into ${newValue})`
    );

    newValue = (counter3 || -1) + 1;
    setCounter3(newValue);
    console.log(
      `------------> counter-3 changed (from ${counter3} into ${newValue})`
    );
  }, [toggle]);

  useEffect(() => {
    console.log(
      `EFFECT : fired on init/change of counter1 <${counter1}> /  counter2 <${counter2}> / counter3 <${counter3}>`
    );
    let newValue = (renderCount || 0) + 1;
    setRenderCount(newValue);
    console.log(
      `------------> renderCount changed (from ${renderCount} into ${newValue})`
    );
  }, [counter1, counter2, counter3]);

  const handleClick = () => {
    let toggleValue = toggle === undefined ? false : toggle;
    setToggle(!toggleValue);
  };

  const logRenderValues = () => {
    console.log("LOGGED FROM RENDER and the VALUES ARE :");
    console.log(
      `------------> counter1: <${counter1}> / counter2: <${counter2}> / counter3: <${counter3}> / renderCount: <${renderCount}>`
    );
    return (
      <div className="App">
        <h1>Function Component</h1>
        <div>Counter1: {counter1}</div>
        <div>Counter2: {counter2}</div>
        <div>Counter3: {counter3}</div>
        <br />
        <div>Component was rendered {renderCount} times</div>
        <button onClick={handleClick}>Click me</button>
      </div>
    );
  };

  return logRenderValues();
}

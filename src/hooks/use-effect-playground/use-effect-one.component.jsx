import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [toggle, setToggle] = useState(undefined);
  const [counter1, setCounter1] = useState(undefined);
  const [counter2, setCounter2] = useState(undefined);
  const [counter3, setCounter3] = useState(undefined);
  const [renderCount, setRenderCount] = useState(undefined);

  useEffect(() => {
    console.log("sideEFFECT-1: Always RUNs after the render");
  }, []); //<- useEffect will run whenever there is a change

  useEffect(() => {
    console.log("sideEFFECT-2: RUNs ONCE After Render");
  }, []); //<- useEffect will run whenever there is a change

  useEffect(() => {
    console.log(`sideEFFECT-3 : RUNs on init/change of toggle <${toggle}>`);

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
      `sideEFFECT-4: RUNs on init/change of counter1 <${counter1}> /  counter2 <${counter2}> / counter3 <${counter3}>`
    );
    let newValue = (renderCount || 0) + 1;
    setRenderCount(newValue);
    console.log(
      `------------> renderCount changed (from ${renderCount} into ${newValue})`
    );
  }, [counter1, counter2, counter3]);

  useEffect(() => {
    console.log("sideEFFECT-5: Run Once After Render");
  }, []); //<- useEffect will run whenever there is a change

  const handleClick = () => {
    let toggleValue = toggle === undefined ? false : toggle;
    setToggle(!toggleValue);
  };

  const localVariable = 500;

  const logRenderValues = () => {
    console.log("LOGGED FROM RENDER and the VALUES ARE :");
    console.log(
      `------------> localVariable: <${localVariable}> counter1: <${counter1}> / counter2: <${counter2}> / counter3: <${counter3}> / renderCount: <${renderCount}>`
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

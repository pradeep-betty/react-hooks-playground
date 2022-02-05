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
  }); //<- useEffect will run on init & whenever there is a change to any state/props

  useEffect(() => {
    console.log("sideEFFECT-2: RUNs ONCE After Render");
  }, []); //<- this useEffect will run once, because the [] is initiallized once & there is no states/props provided to watch for

  useEffect(() => {
    console.log(`sideEFFECT-3 : RUNs on init/change of toggle <${toggle}>`);

    let newValue = (counter1 || 0) + 1;
    setCounter1(newValue);
    console.log(
      `------------> counter-1 will be changed (from ${counter1} into ${newValue}) on next run`
    );

    newValue = (counter2 || 0) + 1;
    setCounter2(newValue);
    console.log(
      `------------> counter-2 will be changed (from ${counter2} into ${newValue}) on next run`
    );

    newValue = (counter3 || 0) + 1;
    setCounter3(newValue);
    console.log(
      `------------> counter-3 will be changed (from ${counter3} into ${newValue}) on next run`
    );
  }, [toggle]); //<- this useEffect will run when the state <toggle> is initialized/changed

  useEffect(() => {
    console.log(
      `sideEFFECT-4: RUNs on init/change of counter1 <${counter1}> /  counter2 <${counter2}> / counter3 <${counter3}>`
    );
    let newValue = (renderCount || 0) + 1;
    setRenderCount(newValue);
    console.log(
      `------------> renderCount will be changed (from ${renderCount} into ${newValue}) on next run`
    );
  }, [counter1, counter2, counter3]); //<- this useEffect will run when the state <counter1/counter2/counter3> is initialized/changed

  useEffect(() => {
    console.log("sideEFFECT-5: RUNs ONCE After Render");
  }, []); //<- this useEffect will run once, because the [] is initiallized once & there is no states/props provided to watch for

  const handleClick = () => {
    let toggleValue = toggle === undefined ? false : toggle;
    let newValue = !toggleValue;
    setToggle(newValue);
    console.log(
      `------------> toggle will be changed (from ${toggle} into ${newValue}) on next run`
    );
  };

  const localVariable = 500;

  const logRenderValues = () => {
    console.log(
      "RENDERED in DOM -> since the following state/prop values are init/changed:"
    );
    console.log(
      `------------> localVariable: <${localVariable}> toggle<${toggle}> counter1: <${counter1}> / counter2: <${counter2}> / counter3: <${counter3}> / renderCount: <${renderCount}>`
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

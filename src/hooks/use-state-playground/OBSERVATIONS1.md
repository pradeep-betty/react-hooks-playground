## based on the following code observations
    1. Two refSnapshots are created:
       1. refSnapshot for Normal Updates
       2. asyncRefSnapshot for Async Updates
    2. 1st Normal-Updates uses the refSnapshot & updates the newSnapShot
    3. 2nd Async-Updates uses the asyncRefSnapshot update the newSnapShot
    4. React compares the newSnapshot with the oldSnapshot and updates the DOM
    5. So as of React v17 -> setStates inside an async SHOULD NOT be individualy set, so instead of using seperate setStates and single object should be used and all updates should be set via single setState call 
       1. The below is costlly inside an async call:
        ```
          asyncFunction () => {
            1. setState({prop1: 'someValue1'}); // -> triggers a render
            2. setState({prop2: 'someValue2'}); // -> triggers another render
        }
       ```
       2. Solution (not costly)
        ```
          asyncFunction () => {
            setState ({           -> triggers a single render
              prop1: 'someValue1' ,
              prop2 : 'someValue2' 
            });
        }
       ```
    6. Contrary to the async,.. individual setStates are batch updated and are not costly in normal updates
       1. the following is not costly as they are bach updated by react
          1. setState({prop1: 'someValue1'});
          2. setState({prop2: 'someValue2'});
```
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const UseState2 = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  const updateState = (arrayValues) => {
    console.log('');
    console.log("TRANSFORMS FROM", [counter1, counter2, counter2], arrayValues);

    const [stableValue, asyncStableValue, asyncUnstableValue] = arrayValues;

    console.log("++++++++++>STABLE - initiates render for 3 States with Value", stableValue);
    // this runs in a seperate snapshot than the async
    setCounter1(counter1 + stableValue);
    setCounter2(counter2 + stableValue);
    setCounter3(counter3 + stableValue);

    // all asyncs run in a seperate snapshot
    Promise.resolve().then((res) => {
      console.log("++++++++++<ASYNC-STABLE - initiates render for 3 States with Value", asyncStableValue);
      // in this context, the previous values are not yet updated by the stable setStates
      setCounter1(counter1 + asyncStableValue);
      setCounter2(counter2 + asyncStableValue);
      setCounter3(counter3 + asyncStableValue);
    });

    Promise.resolve().then((res) => {
      console.log("++++++++++<ASYNC-UNSTABLE-BATCH - initiates render for 3 States with Value", asyncUnstableValue);
      ReactDOM.unstable_batchedUpdates(() => {
        setCounter1(counter1 + asyncUnstableValue);
        setCounter2(counter2 + asyncUnstableValue);
        setCounter3(counter3 + asyncUnstableValue);
      });
    });

    setTimeout(() => {
      Promise.resolve().then((res) => {
        console.log("++++++++++<TIMEOUT-ASYNC-UNSTABLE-BATCH - initiates render for 3 States with Value", asyncUnstableValue);
        ReactDOM.unstable_batchedUpdates(() => {
          setCounter1(counter1 + asyncUnstableValue);
          setCounter2(counter2 + asyncUnstableValue);
          setCounter3(counter3 + asyncUnstableValue);
        });
      })
    }, 1000);

  };

  const handleSendSameValues = () => updateState([1, 1, 1]);
  const handleSendDiffValues = () => updateState([1, 2, 3]);

  const logRenderValues = () => {
    console.log("---> RENDERED in DOM -> since the following state/prop values are init/changed");
    console.log(`      ---> counter1, counter2, counter3`, counter1, counter2, counter3);
    console.info('-END-');

    const counterValues = [1, 1, 1]; // [1, 2, 3]
    return (
      <div className="App">
        <h1>React Update Cycle</h1>
        <div>Counter1: {counter1}</div>
        <div>Counter2: {counter2}</div>
        <div>Counter3: {counter3}</div>
        <br />
        <button onClick={handleSendSameValues}>Send Same values (1, 1, 1)</button>
        <br />
        <br />
        <button onClick={handleSendDiffValues}>Send Diff values (1, 2, 3)</button>
      </div>
    );
  };

  return logRenderValues();
}
export default UseState2;
```
  useEffect:
  -> it runs AFTER the following 3 steps:
        1) the function props(arguments) are derived from the parent
        2) the function states are created (initialized) using useState(...)
        3) all the variables (let/const) & functions are instantiated
        4) render() is called. (i.e) function is rendered with the above states and props

  -> DEFAULT BEHAVIOUR : it runs whenever there is an init or a change in the state of the function

  -> MODIFYING DEFAULT BEHAVIOUR
      1) we can leverage the default behavour and ask it to run whenever there is an init or a change of any state/props of the function by skippinng the 2nd argument
        eg: 
            ``` useEffect(
                // pass the 1st argument function
                 ()=> { 
                    console.log(render);
                 },
                // skip the 2nd argument
                ) 
            ```
      2) we can ask it to run only when a set of specific prop/state inits/changes by passng the state/props in an array as the 2nd argument
        eg: 
            ``` useEffect(
                // pass the 1st argument function
                 ()=> { 
                    console.log(render);
                 },
                // pass the state of props/states that we need to watch for an init/change
                [counter1, counter 2]
                ) 
            ```
      3) we can trick it to run only once (on init) by passing an empty array,
            this happens because the [] is initialized only once and is not going to change after
        eg: 
            ``` useEffect(
                // pass the 1st argument function
                 ()=> { 
                    console.log(render);
                 },
                // by passing the []
                []
                ) 
            ```
  
   
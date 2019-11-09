import useReduction from "./index";

const [state, actions] = useReduction(0, {
  reset(state, action) { 
    return "bad"
  },
  increment: (state, {payload}) => state + payload
});

actions.increment()
import useReduction from "../lib";

const [state, actions] = useReduction(0, {
  reset(state, action) { 
    return 0
  },
  increment: (state, {payload}) => state + payload
});

actions.increment()
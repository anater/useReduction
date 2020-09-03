import useReduction from "../lib";

const [state, actions] = useReduction(0, {
  reset() {
    return 0;
  },
  increment: (state, { payload }: { payload: number }) => state + payload,
  incrementByOne: (state) => state + 1,
});

actions.reset();
actions.increment(5);
actions.incrementByOne();

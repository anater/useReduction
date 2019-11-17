# useReduction

```javascript
function App() {
  const [count, actions] = useReduction(0, {
    increment: (count, { payload }) => count + payload,
    decrement: (count, { payload }) => count - payload
  });

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => actions.increment(2)}>+2</button>
      <button onClick={() => actions.decrement(2)}>-2</button>
    </div>
  );
}
```

useReduction minimizes reducer code by automatically creating action creators from your reducer object.

Write less code by using objects instead of switch statements for defining reducers.

Debugging is baked in. In debug mode, all dispatched actions are logged to the console.

## Installation

`npm install use-reduction`

_Note_: React is a peer dependency. Its assumed you already have this installed for your project.

## Usage

```javascript
import useReduction from "use-reduction";
// Call the hook with an initial state and a reducer object:
const initialState = 0;
const reducer = {
  increment: (count, { payload }) => count + payload,
  decrement: (count, { payload }) => count - payload
};
const [state, actions] = useReduction(initialState, reducer);
```

The hook returns the current state and an object with action creators. When an action creator is called, an action (`{ type, payload }`) will be dispatched to update your state.

### Actions

Action names are derived from reducer names to minimize boilerplate. Providing `useReduction` with a reducer `increment()` will generate an action creator also named `increment()` that dispatches an action with a `type` “increment” and uses the first argument as `payload`. `increment(1)` would use `1` as the `payload` provided to the reducer.

```javascript
// use actions to update count from previous example
actions.increment(1)
// count = 1
actions.decrement(2)
// count = -1
```

### Debugging

Pass `true` as the third argument in `useReduction` to enable debug mode. It will log the dispatched action to the console.

```javascript
const [state, actions] = useReduction(initialState, reducerMap, true);
```

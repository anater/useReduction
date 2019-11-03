import React from "react";

export default function useReduction(initialState, reducerMap, debug = false) {
  const [state, dispatch] = React.useReducer(
    makeReducer(reducerMap),
    initialState
  );
  return [
    state,
    makeActions(reducerMap, dispatch, debug)
  ];
}

function makeReducer(reducerMap) {
  return (state, action) => {
    // if the dispatched action is valid and there's a matching reducer, use it
    if (action && action.type && reducerMap[action.type]) {
      return reducerMap[action.type](state, action);
    } else {
      // always return state if the action has no reducer
      return state;
    }
  };
}

function makeActions(reducerMap, dispatch, debug) {
  // "type" is a key in reducerMap
  return Object.keys(reducerMap).reduce((actions, type) => {
    // if there isn't already an action with this type
    if (!actions[type]) {
      // dispatches action with type and payload when called
      actions[type] = action => {
        dispatch(action);
        // optionally log actions
        if (debug) console.log(action);
      };
    }
    return actions;
  }, {});
}

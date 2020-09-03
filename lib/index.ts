import { useReducer, Reducer, Dispatch, useMemo } from "react";

type Action<T, P> = {
  type: T;
  payload: P;
};

type ActionMap<A> = {
  [K in keyof A]: (payload?: A[K]) => void;
};

type ReducerMap<S, A> = {
  [K in keyof A]: Reducer<S, Action<K, A[K]>>;
};

export default function useReduction<S, A>(
  initialState: S,
  reducerMap: ReducerMap<S, A>,
  debug = false
): [S, ActionMap<A>] {
  const [state, dispatch] = useReducer(makeReducer(reducerMap), initialState);
  const actions = useMemo(
    () => makeActions(reducerMap, dispatch, debug),
    [reducerMap]
  );

  return [state, actions];
}

function makeReducer<S, A>(reducerMap: ReducerMap<S, A>) {
  return (state: S, action: Action<keyof A, any>) => {
    // if the dispatched action is valid and there's a matching reducer, use it
    if (action && action.type && reducerMap[action.type]) {
      return reducerMap[action.type](state, action);
    } else {
      // always return state if the action has no reducer
      return state;
    }
  };
}

function makeActions<S, A>(
  reducerMap: ReducerMap<S, A>,
  dispatch: Dispatch<Action<keyof A, any>>,
  debug: boolean
): ActionMap<A> {
  const types = Object.keys(reducerMap) as Array<keyof A>;

  return types.reduce((actions: ActionMap<A>, type: keyof A) => {
    // if there isn't already an action with this type
    if (!actions[type]) {
      // dispatches action with type and payload when called
      actions[type] = (payload: any) => {
        const action = { type, payload };
        dispatch(action);
        // optionally log actions
        if (debug) console.log(action);
      };
    }
    return actions;
  }, {} as ActionMap<A>);
}

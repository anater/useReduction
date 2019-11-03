import React from "react";

interface Action<T = string> {
  type: T;
  payload: any;
}

type Reducer<S, A> = React.Reducer<S, Action<keyof A>>;

interface ActionCreators<A> {
  [action: keyof A]: (payload: any) => void;
}

interface ReducerMap<S, A> {
  [reducer: keyof A]: Reducer<S, A>;
}

interface Reduction<S, A> {
  state: S;
  actions: ActionCreators<A>;
}

/**
 * Maps keys from `reducer` into `actions` which update `state`
 */
export default function useReduction<S, A>(
  initialState: S,
  reducer: ReducerMap<S, A>,
  debug: boolean
): Reduction<S, A>;

/** 
 * Builds `React.Reducer` from `reducerMap` 
 */
function makeReducer<S, A>(reducerMap: ReducerMap<S, A>): Reducer<S, A>;

function makeActions<S, A>(
  reducerMap: ReducerMap<S, A>,
  dispatch: React.Dispatch<Action<keyof A>>,
  debug: boolean
): ActionCreators<A>;

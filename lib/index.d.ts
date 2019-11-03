import React from "react";

// Actions

type Action<T = string> = {
  type: T;
  payload: any;
};

type ActionCreators<A> = {
  [action: keyof A]: (payload: any) => void;
};

// Reducers

type Reducer<S, A> = React.Reducer<S, Action<keyof A>>;

type ReducerMap<S, A> = {
  [reducer: keyof A]: Reducer<S, A>;
};

type Reduction<State, Action> = [State, ActionCreators<Action>];

/**
 * Maps keys from `reducer` into `actions` which update `state`
 */
export default function useReduction<State, Action>(
  initialState: State,
  reducer: ReducerMap<State, Action>,
  debug: boolean
): Reduction<State, Action>;

/**
 * Builds `React.Reducer` from `reducerMap`
 */
function makeReducer<S, A>(reducerMap: ReducerMap<S, A>): Reducer<S, A>;

/**
 * Builds action creators object from `reducerMap` keys.
 * Action creators are bound to `dispatch` and will log actions when `debug` is true
 */
function makeActions<S, A>(
  reducerMap: ReducerMap<S, A>,
  dispatch: React.Dispatch<Action<keyof A>>,
  debug: boolean
): ActionCreators<A>;

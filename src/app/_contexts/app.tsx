'use client'

import React, { createContext, useMemo, useReducer, useContext, useCallback } from "react";
import { SharedActions, SignsType, UserType, initialState, reducer } from '@/app/_reducers/app';

interface IProps {
  children: React.ReactNode;
}

interface IContextProps {
  submitted: boolean;
  submitting: boolean;
  fetched: boolean;
  fetching: boolean;
  error: string | null;
  user: UserType;
  signs: SignsType;
  fetchSigns: () => void;
  dispatch: React.Dispatch<SharedActions>,
}

const Context = createContext<IContextProps>({} as IContextProps);
Context.displayName = 'FormContext';

export const Provider: React.FunctionComponent<IProps> = ({ children }) => {
  const [{ user, signs, submitted, submitting, fetched, fetching, error }, dispatch] = useReducer(reducer, initialState);

  const fetchSigns = useCallback(async () => {
    dispatch({ type: 'FETCH_SIGNS' })
    const signs = await (await fetch(`${process.env.NEXT_PUBLIC_GP_API}forma/form/${process.env.NEXT_PUBLIC_CONTACT_FORM_ID}`)).json();
    
    dispatch({
      type: 'UPDATE_SIGNS',
      payload: {
        totalSigns: (signs.total || 0) + 76050, // Hardcoded from form id 98
      }
    })
    
    dispatch({ type: 'FETCHED_VOTES' })
  }, [ dispatch ])

  return useMemo(() => (
    <Context.Provider value={{
      user,
      signs,
      submitted,
      submitting,
      fetched,
      fetching,
      error,
      fetchSigns,
      dispatch,
    }}>
      { children }
    </Context.Provider>
  ), [
    children,
    user,
    signs,
    fetched,
    fetching,
    submitted,
    submitting,
    error,
    fetchSigns,
    dispatch,
  ]);
};

export const useAppContext = () => useContext(Context);

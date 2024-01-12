export interface GenericReducerFn<S, A> { 
  (state: S, action: A): S;
}

export type UserType = {
  id?: number,
  firstName: string;
  lastName: string;
  // fullName: string;
  email: string;
  // phoneNumber: string;
  // docNumber: string;
  // province: string;
}

export type SignsType = {
  totalSigns: number;
}

export type DataType = {
  user: UserType;
  signs: SignsType;
}

export type SharedState = {
  submitted: boolean,
  submitting: boolean,
  fetched: boolean,
  fetching: boolean,
  error: string | null,
};

export type SharedActions = 
  | { type: 'SUBMIT_FORM' }
  | { type: 'SUBMITTED_FORM' }
  | { type: 'FETCH_SIGNS' }
  | { type: 'FETCHED_VOTES' }
  | { type: 'RESET_SIGNS' }
  | { type: 'ERROR', payload: { error: string | null; } }
  | { type: 'FAILURE', error: any }
  | { type: 'UPDATE_FIELD', payload: any }
  | { type: 'UPDATE_SIGNS', payload: SignsType }

export type ContextStateType = {
  user: UserType;
  signs: SignsType;
} & SharedState;

export type ContextActionType = SharedActions;

export const initialState: ContextStateType = {
  user: {
    firstName: '',
    lastName: '',
    // fullName: '',
    // docNumber: '',
    // phoneNumber: '',
    email: '',
    // province: '',
    // agePermitted: false,
    ...((process.env.NEXT_PUBLIC_FILL_FORM === 'true') ? {
      firstName: 'Doe',
      lastName: 'Deer',
      // fullName: 'Doe Deer',
      // docNumber: '12345678',
      // phoneNumber: '44440000',
      email: 'doe.deer@email.com',
      // province: 'Buenos Aires',
    } : {}),
  } as UserType,
  signs: {} as SignsType,
  submitted: false,
  submitting: false,
  fetching: false,
  fetched: false,
  error: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    }
    case 'UPDATE_SIGNS': {
      return {
        ...state,
        signs: {
          ...state.signs,
          totalSigns: action.payload.totalSigns,
        },
      }
    }
    case 'SUBMIT_FORM': {
      return {
        ...state,
        submitting: true,
        submitted: false,
      }
    }
    case 'SUBMITTED_FORM': {
      return {
        ...state,
        submitting: false,
        submitted: true,
      }
    }
    case 'FETCH_SIGNS': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }
    case 'FETCHED_VOTES': {
      return {
        ...state,
        fetching: false,
        fetched: true,
      }
    }
    case 'RESET_SIGNS': {
      return {
        ...state,
        quiz: {
          totalSigns: 0,
        }
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        submitting: false,
        submitted: false,
        error: action.error,
      }
    }
    case 'ERROR': {
      return {
        ...state,
        error: action.payload.error || null,
      }
    }
    default: {
      throw new Error('Reducer Error');
    }
  }
}

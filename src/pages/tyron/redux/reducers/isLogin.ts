const initialState = {
  isLogin: undefined,
};

const isLogin = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isLogin: action.meta,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default isLogin;

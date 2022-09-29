const initialState = {
  passcode: '',
  zilpay: '',
  arconnect: '',
  name: '',
  domain: '',
  doc: null,
  loginInfo: null,
  lang: 'en',
  isDark: true,
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case 'PASSCODE': {
      return {
        ...state,
        passcode: action.meta,
      };
    }
    case 'ZILPAY': {
      return {
        ...state,
        zilpay: action.meta,
      };
    }
    case 'ARCONNECT': {
      return {
        ...state,
        arconnect: action.meta,
      };
    }
    case 'UPDATENAME': {
      return {
        ...state,
        name: action.meta,
      };
    }
    case 'UPDATEDOMAIN': {
      return {
        ...state,
        domain: action.meta,
      };
    }
    case 'UPDATEDOC': {
      return {
        ...state,
        doc: action.meta,
      };
    }
    case 'UPDATELOGININFO': {
      return {
        ...state,
        loginInfo: action.meta,
      };
    }
    case 'UPDATELANG': {
      return {
        ...state,
        lang: action.meta,
      };
    }
    case 'UPDATEISDARK': {
      return {
        ...state,
        isDark: action.meta,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default user;

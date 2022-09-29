const setLogin = (data: any) => {
  return {
    type: 'LOGIN',
    meta: data,
  };
};

export {setLogin};

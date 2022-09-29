const passcodeKey = (data: any) => {
  return {
    type: 'PASSCODE',
    meta: data,
  };
};
const zilpayKey = (data: any) => {
  return {
    type: 'ZILPAY',
    meta: data,
  };
};
const arconnectKey = (data: any) => {
  return {
    type: 'ARCONNECT',
    meta: data,
  };
};
const updateName = (data: string) => {
  return {
    type: 'UPDATENAME',
    meta: data,
  };
};
const updateDomain = (data: string) => {
  return {
    type: 'UPDATEDOMAIN',
    meta: data,
  };
};
const updateDoc = (data: any) => {
  return {
    type: 'UPDATEDOC',
    meta: data,
  };
};
const updateLoginInfo = (data: any) => {
  return {
    type: 'UPDATELOGININFO',
    meta: data,
  };
};
const updateLang = (data: any) => {
  return {
    type: 'UPDATELANG',
    meta: data,
  };
};
const updateIsDark = (data: any) => {
  return {
    type: 'UPDATEISDARK',
    meta: data,
  };
};

export {
  passcodeKey,
  zilpayKey,
  arconnectKey,
  updateDoc,
  updateName,
  updateDomain,
  updateLoginInfo,
  updateLang,
  updateIsDark,
};

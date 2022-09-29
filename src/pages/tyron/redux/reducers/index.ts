import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import user from './user';
import isLogin from './isLogin';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  debug: false,
  blacklist: ['isLogin'],
};

const reducer: any = combineReducers({
  user,
  isLogin,
});

export default persistReducer(persistConfig, reducer);

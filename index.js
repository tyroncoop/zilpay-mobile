/**
 * @format
 */
import './shim';
import './src/pages/tyron/assets/i18n/i18n';

import { AppRegistry } from 'react-native';
import root from './src/root';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';

enableScreens();

AppRegistry.registerComponent(appName, () => root);

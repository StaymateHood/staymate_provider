/**
 * @format
 */

import './src/language/i18n'; // initialise i18next before anything renders
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

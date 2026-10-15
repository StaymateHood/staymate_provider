import LinearGradient from 'react-native-linear-gradient';
import {cssInterop} from 'nativewind';

// Let LinearGradient accept `className` like any other NativeWind view.
cssInterop(LinearGradient, {className: 'style'});

export const BRAND_GRADIENT = ['#0E7C86', '#073F45'];

export default LinearGradient;

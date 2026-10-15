import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import GradientView, {BRAND_GRADIENT} from './GradientView';

const AuthHeader = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <GradientView
      colors={BRAND_GRADIENT}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      className="rounded-b-[36px] px-5 pb-12"
      style={{paddingTop: insets.top + 48}}>
      <View className="flex-row items-center">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
          <Text className="text-2xl">🤝</Text>
        </View>
        <Text className="ml-3 font-pbold text-lg text-white">{t('brand')}</Text>
      </View>

      <Text className="mt-6 font-pbold text-[28px] text-white">{t('welcome')}</Text>
      <Text className="mt-1 font-pregular text-[15px] leading-6 text-white/90">
        {t('welcomeSub')}
      </Text>
    </GradientView>
  );
};

export default AuthHeader;

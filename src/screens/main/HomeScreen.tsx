import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {PrimaryButton} from '../../components';
import {RootStackParamList} from '../../navigator/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Placeholder landing screen after OTP verification.
const HomeScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-surface px-6">
      <Text className="text-5xl">🤝</Text>
      <Text className="mt-4 font-pbold text-2xl text-ink">{t('homeTitle')}</Text>
      <Text className="mt-1 font-pregular text-base text-ink-muted">
        {t('homeSub', {phone: route.params.phone})}
      </Text>
      <View className="mt-8 w-full">
        <PrimaryButton
          title={t('logout')}
          onPress={() => navigation.reset({index: 0, routes: [{name: 'Login'}]})}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

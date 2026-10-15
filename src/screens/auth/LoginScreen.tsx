import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {AuthHeader, LanguageSwitcher, PrimaryButton} from '../../components';
import {RootStackParamList} from '../../navigator/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
type Mode = 'signIn' | 'signUp';

const TRUST_BADGES = [
  {icon: '🔒', key: 'otpSecure'},
  {icon: 'IN', key: 'madeForIndia'},
  {icon: '✓', key: 'freeToJoin'},
] as const;

const LoginScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [mode, setMode] = useState<Mode>('signIn');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSendOtp = () => {
    if (mode === 'signUp' && !name.trim()) {
      setError(t('invalidName'));
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(t('invalidMobile'));
      return;
    }
    setError('');
    setLoading(true);
    // TODO: call the send-OTP API here.
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Otp', {phone, name: name.trim() || undefined});
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerClassName="pb-10"
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <AuthHeader />

        <View className="px-4 pt-7">
          <LanguageSwitcher />

          {/* Sign in / Sign up segmented tabs */}
          <View className="mt-5 flex-row gap-2">
            {(['signIn', 'signUp'] as Mode[]).map(m => {
              const active = mode === m;
              return (
                <Pressable
                  key={m}
                  onPress={() => {
                    setMode(m);
                    setError('');
                  }}
                  className={`h-[46px] flex-1 items-center justify-center rounded-xl ${
                    active ? 'bg-brand-500' : 'bg-[#E9EEF3]'
                  }`}>
                  <Text
                    className={`font-psemibold text-[15px] ${
                      active ? 'text-white' : 'text-ink-muted'
                    }`}>
                    {t(m)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {mode === 'signUp' && (
            <>
              <Text className="mt-6 font-psemibold text-[13px] uppercase tracking-wide text-ink-muted">
                {t('fullName')}
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t('fullNamePlaceholder')}
                placeholderTextColor="#94A3B8"
                className="mt-2 h-[58px] rounded-2xl border border-line bg-white px-4 font-pregular text-lg text-ink"
              />
            </>
          )}

          <Text className="mt-6 font-psemibold text-[13px] uppercase tracking-wide text-ink-muted">
            {t('mobileNumber')}
          </Text>
          <View
            className={`mt-2 h-[58px] flex-row items-center rounded-2xl border bg-white px-4 ${
              error ? 'border-red-400' : 'border-line'
            }`}>
            <Text className="font-psemibold text-lg text-ink">+91</Text>
            <TextInput
              value={phone}
              onChangeText={v => setPhone(v.replace(/\D/g, ''))}
              placeholder="98765 43210"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={10}
              className="ml-3 flex-1 font-pregular text-lg text-ink"
            />
          </View>
          {!!error && (
            <Text className="mt-2 font-pregular text-[13px] text-red-500">{error}</Text>
          )}

          <View className="mt-6">
            <PrimaryButton title={t('sendOtp')} onPress={onSendOtp} loading={loading} />
          </View>

          <View className="mt-6 flex-row flex-wrap justify-center gap-2">
            {TRUST_BADGES.map(b => (
              <View
                key={b.key}
                className="flex-row items-center rounded-full bg-[#E9F1F2] px-3 py-1.5">
                <Text className="mr-1 font-pbold text-[11px] text-ink">{b.icon}</Text>
                <Text className="font-psemibold text-[13px] text-ink">{t(b.key)}</Text>
              </View>
            ))}
          </View>

          <Text className="mt-5 px-2 text-center font-pregular text-[13px] leading-5 text-ink-muted">
            {t('terms')}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

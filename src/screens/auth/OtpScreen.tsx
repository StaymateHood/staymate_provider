import React, {useEffect, useRef, useState} from 'react';
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
import {AuthHeader, PrimaryButton} from '../../components';
import {RootStackParamList} from '../../navigator/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const OTP_LENGTH = 6;
const DEMO_OTP = '123456';
const RESEND_SECONDS = 30;

const OtpScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const {phone} = route.params;
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState(DEMO_OTP);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const onVerify = () => {
    if (code.length !== OTP_LENGTH) {
      setError(t('invalidOtp'));
      return;
    }
    setError('');
    setLoading(true);
    // TODO: call the verify-OTP API here and store the token.
    setTimeout(() => {
      setLoading(false);
      navigation.reset({index: 0, routes: [{name: 'Home', params: {phone}}]});
    }, 600);
  };

  const onResend = () => {
    // TODO: call the resend-OTP API here.
    setCode('');
    setSeconds(RESEND_SECONDS);
    inputRef.current?.focus();
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

        <View className="px-6 pt-8">
          <Text className="font-pbold text-base text-ink">{t('enterCode')}</Text>
          <View className="mt-0.5 flex-row items-center">
            <Text className="font-pregular text-sm text-ink-muted">
              {t('sentTo', {phone})}
              {' · '}
            </Text>
            <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
              <Text className="font-pbold text-sm text-brand-600">{t('change')}</Text>
            </Pressable>
          </View>

          {/* One wide code box, like the design */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={v => setCode(v.replace(/\D/g, '').slice(0, OTP_LENGTH))}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            maxLength={OTP_LENGTH}
            placeholder="••••••"
            placeholderTextColor="#CBD5E1"
            className={`mt-5 h-[70px] rounded-2xl border bg-white text-center font-pbold text-2xl tracking-[8px] text-ink ${
              error ? 'border-red-400' : 'border-line'
            }`}
          />

          {error ? (
            <Text className="mt-2 font-pregular text-xs text-red-500">{error}</Text>
          ) : (
            code === DEMO_OTP && (
              <Text className="mt-2 font-pregular text-xs text-ink-muted">{t('demoCode')}</Text>
            )
          )}

          <View className="mt-6">
            <PrimaryButton title={t('verify')} onPress={onVerify} loading={loading} />
          </View>

          <View className="mt-5 flex-row items-center justify-center">
            <Text className="font-pregular text-sm text-ink-muted">{t('didntGet')} </Text>
            {seconds > 0 ? (
              <Text className="font-psemibold text-sm text-ink-soft">
                {t('resendIn', {s: seconds})}
              </Text>
            ) : (
              <Pressable onPress={onResend} hitSlop={8}>
                <Text className="font-pbold text-sm text-brand-600">{t('resend')}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

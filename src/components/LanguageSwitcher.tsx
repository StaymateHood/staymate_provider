import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../language/i18n';

const LanguageSwitcher = () => {
  const {i18n} = useTranslation();

  return (
    <View className="flex-row justify-center gap-2">
      {LANGUAGES.map(lang => {
        const active = i18n.language === lang.code;
        return (
          <Pressable
            key={lang.code}
            onPress={() => i18n.changeLanguage(lang.code)}
            className={`rounded-full border px-4 py-2 ${
              active ? 'border-brand-600 bg-brand-50' : 'border-line bg-white'
            }`}>
            <Text
              className={`font-psemibold text-[15px] ${
                active ? 'text-brand-800' : 'text-ink'
              }`}>
              {lang.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default LanguageSwitcher;

import React from 'react';
import {ActivityIndicator, Pressable, Text} from 'react-native';
import GradientView, {BRAND_GRADIENT} from './GradientView';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const PrimaryButton = ({title, onPress, loading, disabled}: Props) => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    className={`overflow-hidden rounded-2xl active:opacity-90 ${
      disabled ? 'opacity-50' : ''
    }`}>
    <GradientView
      colors={BRAND_GRADIENT}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      className="h-[58px] items-center justify-center">
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="font-pbold text-[17px] text-white">{title}</Text>
      )}
    </GradientView>
  </Pressable>
);

export default PrimaryButton;

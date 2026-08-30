import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  name: any;
  size?: number;
  color?: string;
};

export default function AppIcon({ name, size = 24, color = '#fff' }: Props) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
    />
  );
}

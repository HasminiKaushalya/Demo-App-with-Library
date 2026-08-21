import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppIcon({ name, size = 24, color = '#fff' }) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
    />
  );
}
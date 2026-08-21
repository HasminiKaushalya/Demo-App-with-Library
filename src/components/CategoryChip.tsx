
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';

type Props = {
  title: string;
  icon?: string;
  isActive?: boolean;
  count?: number;
  onPress?: () => void;
};

export default function CategoryChip({
  title,
  icon,
  isActive = false,
  count,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.chip, isActive && styles.chipActive]}
    >
      

      <Text style={[styles.text, isActive && styles.textActive]}>
        {title}
      </Text>

      {count !== undefined ? (
        <View style={[styles.badge, isActive && styles.badgeActive]}>
          <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
            {count}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  chipActive: {
    backgroundColor: 'rgba(124,92,255,0.28)',
    borderColor: 'rgba(168,85,247,0.45)',

  
  },
  text: {
    color: Colors.textSoft,
    fontSize: 13,
    fontWeight: '800',
  },
  textActive: {
    color: Colors.white,
  },
  badge: {
    marginLeft: 7,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  badgeActive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  badgeText: {
    color: Colors.textSoft,
    fontSize: 11,
    fontWeight: '900',
  },
  badgeTextActive: {
    color: Colors.white,
  },
});
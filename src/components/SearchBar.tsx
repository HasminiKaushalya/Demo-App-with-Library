
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Colors } from '../theme/colors';

type Props = {
  placeholder?: string;
  onSearch?: (text: string) => void;
};

export default function SearchBar({ placeholder, onSearch }: Props) {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⌕</Text>

      <TextInput
        value={text}
        onChangeText={(value) => {
          setText(value);
          onSearch?.(value);
        }}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor={Colors.textMuted}
        style={styles.input}
      />

      <TouchableOpacity style={styles.filter}>
        <Text style={styles.filterText}>≡</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  icon: {
    color: Colors.textSoft,
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
  },
  filter: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
});
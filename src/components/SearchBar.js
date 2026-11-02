
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import colors from '../../constants/colors';

const SearchBar = ({ value, onChangeText, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>⌕</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for groceries, snacks & more"
        placeholderTextColor={colors.secondaryText}
        value={value}
        onChangeText={onChangeText}
        onPressIn={onPress}
        returnKeyType="search"
      />

      <Text style={styles.mic}>🎙</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  searchIcon: {
    fontSize: 25,
    marginRight: 10,
    color: colors.text,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    paddingVertical: 0,
  },

  mic: {
    fontSize: 17,
  },
});

export default SearchBar;


import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import colors from '../../constants/colors';

const SectionHeader = ({ title, onSeeAll }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Pressable onPress={onSeeAll}>
        <Text style={styles.seeAll}>See all ›</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default SectionHeader;

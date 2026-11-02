
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import colors from '../../constants/colors';

const CategoryCard = ({ item, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.imageContainer, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 78,
    alignItems: 'center',
    marginRight: 12,
  },

  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 34,
  },

  name: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CategoryCard;

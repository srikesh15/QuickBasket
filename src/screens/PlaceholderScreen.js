
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ route }) => {
  const title = route.params?.category
    ? `${route.params.category} Products`
    : route.params?.product?.name || route.name;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        Screen will be developed in the next step.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8F7',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 10,
    color: '#667085',
  },
});

export default PlaceholderScreen;

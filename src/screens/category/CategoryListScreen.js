
import React from 'react';

import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import CategoryCard from '../../components/CategoryCard/CategoryCard';

import { categories } from '../../constants/dummyData';
import colors from '../../constants/colors';

const CategoryListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </Pressable>

        <Text style={styles.title}>All Categories</Text>
      </View>

      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.categoryWrapper}>
            <CategoryCard
              item={item}
              onPress={() =>
                navigation.navigate('Category', {
                  category: item.name,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  back: {
    fontSize: 35,
    color: colors.text,
    marginRight: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },

  list: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  categoryWrapper: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default CategoryListScreen;

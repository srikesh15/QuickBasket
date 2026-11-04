
import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';

import { useSelector } from 'react-redux';

import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';

import { products } from '../../constants/dummyData';
import colors from '../../constants/colors';

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;

  const [search, setSearch] = useState('');

  const wishlistItems = useSelector(
    state => state.wishlist.items,
  );

  const categoryProducts = useMemo(() => {
    return products.filter(item => {
      const matchesCategory = item.category === category;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const renderProduct = ({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard
        item={item}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product: item,
          })
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
      />

      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>{category}</Text>

        <Pressable
          onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartIcon}>🛒</Text>
        </Pressable>
      </View>

      {/* SEARCH */}

      <View style={styles.searchWrapper}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* CATEGORY INFO */}

      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>
          {category} Products
        </Text>

        <Text style={styles.productCount}>
          {categoryProducts.length} products
        </Text>
      </View>

      {/* PRODUCT GRID */}

      {categoryProducts.length > 0 ? (
        <FlatList
          data={categoryProducts}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🔍</Text>

          <Text style={styles.emptyTitle}>
            No products found
          </Text>

          <Text style={styles.emptySubtitle}>
            Try searching for another product.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },

  backButton: {
    width: 35,
  },

  backText: {
    fontSize: 35,
    color: colors.text,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginLeft: 10,
  },

  cartIcon: {
    fontSize: 23,
  },

  searchWrapper: {
    paddingHorizontal: 18,
    marginVertical: 12,
  },

  categoryInfo: {
    paddingHorizontal: 18,
    marginVertical: 12,
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },

  productCount: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 5,
  },

  productList: {
    paddingHorizontal: 18,
    paddingBottom: 25,
  },

  productWrapper: {
    width: '50%',
    marginBottom: 15,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyEmoji: {
    fontSize: 45,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    color: colors.text,
  },

  emptySubtitle: {
    fontSize: 13,
    marginTop: 8,
    color: colors.secondaryText,
  },
});

export default CategoryScreen;

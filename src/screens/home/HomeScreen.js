
import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  FlatList,
  StatusBar,
} from 'react-native';

import { useSelector } from 'react-redux';

import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

import { categories, products } from '../../constants/dummyData';
import colors from '../../constants/colors';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const cartItems = useSelector(state => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleCategoryPress = category => {
    navigation.navigate('Category', {
      category,
    });
  };

  const handleProductPress = product => {
    navigation.navigate('ProductDetails', {
      product,
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* LOCATION HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.deliveringText}>
              Delivering to
            </Text>

            <Pressable
              onPress={() => navigation.navigate('Location')}>
              <Text style={styles.locationText}>
                Home • Hyderabad ▼
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.cartIcon}>🛒</Text>

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* SEARCH */}

        <View style={styles.searchWrapper}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            onPress={() => navigation.navigate('Search')}
          />
        </View>

        {/* BANNER */}

        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerTag}>
              QUICKBASKET EXPRESS
            </Text>

            <Text style={styles.bannerTitle}>
              Freshness{'\n'}at your door.
            </Text>

            <Text style={styles.bannerSubtitle}>
              Everyday essentials, delivered fast.
            </Text>
          </View>

          <Text style={styles.bannerEmoji}>🛵</Text>
        </View>

        {/* CATEGORIES */}

        <View style={styles.section}>
          <SectionHeader
            title="Shop by category"
            onSeeAll={() => navigation.navigate('CategoryList')}
          />

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CategoryCard
                item={item}
                onPress={() => handleCategoryPress(item.name)}
              />
            )}
          />
        </View>

        {/* POPULAR PRODUCTS */}

        <View style={styles.section}>
          <SectionHeader
            title="Popular near you"
            onSeeAll={() => navigation.navigate('CategoryList')}
          />

          <FlatList
            data={filteredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onPress={() => handleProductPress(item)}
              />
            )}
          />
        </View>

        {/* BEST DEALS */}

        <View style={styles.section}>
          <SectionHeader title="Best deals for you" />

          <FlatList
            data={products.filter(item => item.mrp > item.price)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `deal-${item.id}`}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onPress={() => handleProductPress(item)}
              />
            )}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made for everyday shopping ❤️
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.activeNavText}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('CategoryList')}>
          <Text style={styles.navIcon}>▦</Text>
          <Text style={styles.navText}>Categories</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.navIcon}>🛒</Text>
          <Text style={styles.navText}>Cart</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.navIcon}>▤</Text>
          <Text style={styles.navText}>Orders</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>♙</Text>
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  deliveringText: {
    fontSize: 12,
    color: colors.secondaryText,
  },

  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },

  cartButton: {
    width: 46,
    height: 46,
    backgroundColor: colors.white,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartIcon: {
    fontSize: 21,
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.primary,
    width: 19,
    height: 19,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },

  searchWrapper: {
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  banner: {
    backgroundColor: colors.primary,
    marginHorizontal: 18,
    padding: 20,
    height: 158,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bannerTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DCFCE7',
    letterSpacing: 1,
  },

  bannerTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.white,
    marginTop: 7,
    lineHeight: 30,
  },

  bannerSubtitle: {
    fontSize: 11,
    color: colors.white,
    marginTop: 7,
  },

  bannerEmoji: {
    fontSize: 58,
  },

  section: {
    marginTop: 26,
    paddingLeft: 18,
  },

  footer: {
    padding: 25,
    alignItems: 'center',
  },

  footerText: {
    color: colors.secondaryText,
    fontSize: 12,
  },

  bottomNav: {
    height: 65,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  navIcon: {
    fontSize: 20,
    color: colors.secondaryText,
  },

  activeNavText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },

  navText: {
    color: colors.secondaryText,
    fontSize: 10,
    marginTop: 3,
  },
});

export default HomeScreen;

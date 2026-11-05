
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity
} from '../../redux/slices/cartSlice';

import {
  toggleWishlist,
} from '../../redux/slices/wishlistSlice';

import colors from '../../constants/colors';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const dispatch = useDispatch();

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const wishlistItems = useSelector(
    state => state.wishlist.items,
  );

  const isWishlisted = wishlistItems.some(
    item => item.id === product.id,
  );

  const cartItem = useSelector(state =>
    state.cart.items.find(item => item.id === product.id),
  );

  useEffect(() => {
  setSelectedQuantity(cartItem?.quantity || 1);
}, [cartItem?.quantity]);

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100,
  );

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = () => {
    if (cartItem) {
  const difference = selectedQuantity - cartItem.quantity;

  if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      dispatch(increaseQuantity(product.id));
    }
  } else if (difference < 0) {
    for (let i = 0; i < Math.abs(difference); i++) {
      dispatch(decreaseQuantity(product.id));
    }
  }
} else {
  dispatch(addToCart(product));

  for (let i = 1; i < selectedQuantity; i++) {
    dispatch(increaseQuantity(product.id));
  }
}

navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Product Details</Text>

          <Pressable onPress={handleWishlist}>
            <Text style={styles.heart}>
              {isWishlisted ? '❤️' : '♡'}
            </Text>
          </Pressable>
        </View>

        {/* PRODUCT IMAGE */}

        <View style={styles.imageContainer}>
          <Text style={styles.productEmoji}>
            {product.emoji}
          </Text>

          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {discount}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* PRODUCT INFORMATION */}

        <View style={styles.detailsContainer}>
          <Text style={styles.brand}>{product.brand}</Text>

          <Text style={styles.productName}>
            {product.name}
          </Text>

          <Text style={styles.packSize}>
            {product.quantity}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ₹{product.price}
            </Text>

            {product.mrp > product.price && (
              <>
                <Text style={styles.mrp}>
                  ₹{product.mrp}
                </Text>

                <Text style={styles.savings}>
                  Save ₹{product.mrp - product.price}
                </Text>
              </>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              ★ {product.rating}
            </Text>

            <Text style={styles.ratingText}>
              Product rating
            </Text>
          </View>

          <View style={styles.divider} />

          {/* QUANTITY */}

          <Text style={styles.sectionTitle}>
            Select quantity
          </Text>

          <View style={styles.quantityContainer}>
            <Pressable
              style={styles.quantityButton}
              disabled={selectedQuantity === 1}
              onPress={() =>
                setSelectedQuantity(previous => previous - 1)
              }>
              <Text style={styles.quantityButtonText}>−</Text>
            </Pressable>

            <Text style={styles.quantityValue}>
              {selectedQuantity}
            </Text>

            <Pressable
              style={styles.quantityButton}
              onPress={() =>
                setSelectedQuantity(previous => previous + 1)
              }>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {/* PRODUCT DESCRIPTION */}

          <Text style={styles.sectionTitle}>
            Product information
          </Text>

          <Text style={styles.description}>
            {product.name} from {product.brand}.
            A convenient everyday essential, available
            for quick delivery to your doorstep.
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Brand</Text>
            <Text style={styles.infoValue}>{product.brand}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>
              {product.category}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Pack size</Text>
            <Text style={styles.infoValue}>
              {product.quantity}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM ADD TO CART */}

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.bottomLabel}>Total price</Text>

          <Text style={styles.bottomPrice}>
            ₹{product.price * selectedQuantity}
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>
            {cartItem ? 'UPDATE CART' : 'ADD TO CART'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  backButton: {
    fontSize: 35,
    color: colors.text,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },

  heart: {
    fontSize: 26,
    color: colors.text,
  },

  imageContainer: {
    height: 300,
    backgroundColor: '#F7F8F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productEmoji: {
    fontSize: 115,
  },

  discountBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
  },

  discountText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '700',
  },

  detailsContainer: {
    padding: 20,
  },

  brand: {
    fontSize: 13,
    color: colors.secondaryText,
  },

  productName: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.text,
    marginTop: 6,
  },

  packSize: {
    fontSize: 13,
    color: colors.secondaryText,
    marginTop: 7,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },

  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },

  mrp: {
    fontSize: 14,
    color: colors.secondaryText,
    textDecorationLine: 'line-through',
  },

  savings: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    gap: 10,
  },

  rating: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
    padding: 6,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '700',
  },

  ratingText: {
    color: colors.secondaryText,
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 15,
    backgroundColor: colors.lightGreen,
    borderRadius: 10,
  },

  quantityButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '700',
  },

  quantityValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 10,
  },

  description: {
    fontSize: 13,
    lineHeight: 21,
    color: colors.secondaryText,
    marginTop: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  infoLabel: {
    color: colors.secondaryText,
    fontSize: 13,
  },

  infoValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },

  bottomContainer: {
    minHeight: 76,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  bottomLabel: {
    fontSize: 11,
    color: colors.secondaryText,
  },

  bottomPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 3,
  },

  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 12,
  },

  addButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});

export default ProductDetailsScreen;

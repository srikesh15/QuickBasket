
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { useDispatch } from 'react-redux';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice';

import colors from '../../constants/colors';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* PRODUCT IMAGE */}

      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      {/* PRODUCT DETAILS */}

      <View style={styles.details}>
        <Text style={styles.brand}>{item.brand}</Text>

        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.packSize}>
          {item.quantity}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{item.price}
          </Text>

          {item.mrp > item.price && (
            <Text style={styles.mrp}>
              ₹{item.mrp}
            </Text>
          )}
        </View>
      </View>

      {/* QUANTITY CONTROLS */}

      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
          <Pressable
            onPress={() =>
              dispatch(decreaseQuantity(item.id))
            }
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>

          <Text style={styles.quantityValue}>
            {item.quantity}
          </Text>

          <Pressable
            onPress={() =>
              dispatch(increaseQuantity(item.id))
            }
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.itemTotal}>
          ₹{item.price * item.quantity}
        </Text>

        <Pressable
          onPress={() =>
            dispatch(removeFromCart(item.id))
          }>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  imageContainer: {
    width: 76,
    height: 82,
    backgroundColor: '#F7F8F7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 39,
  },

  details: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
  },

  brand: {
    fontSize: 10,
    color: colors.secondaryText,
  },

  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },

  packSize: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 4,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    gap: 7,
  },

  price: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },

  mrp: {
    fontSize: 11,
    color: colors.secondaryText,
    textDecorationLine: 'line-through',
  },

  actions: {
    alignItems: 'center',
    gap: 8,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 31,
  },

  quantityButton: {
    paddingHorizontal: 9,
    height: 31,
    justifyContent: 'center',
  },

  quantityButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  quantityValue: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  itemTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },

  removeText: {
    fontSize: 11,
    color: colors.error,
    fontWeight: '600',
  },
});

export default CartItem;

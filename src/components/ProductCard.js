
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { addToCart, increaseQuantity } from '../../redux/slices/cartSlice';

import colors from '../../constants/colors';

const ProductCard = ({ item, onPress }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(state =>
    state.cart.items.find(product => product.id === item.id),
  );

  const handleAdd = () => {
    if (cartItem) {
      dispatch(increaseQuantity(item.id));
    } else {
      dispatch(addToCart(item));
    }
  };

  const discount = Math.round(
    ((item.mrp - item.price) / item.mrp) * 100,
  );

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>

        {discount > 0 && (
          <View style={styles.discount}>
            <Text style={styles.discountText}>
              {discount}% OFF
            </Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.quantity}>
          {item.quantity}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>

          {item.mrp > item.price && (
            <Text style={styles.mrp}>₹{item.mrp}</Text>
          )}
        </View>

        {cartItem ? (
          <View style={styles.quantityContainer}>
            <Pressable
              onPress={() => dispatch({
                type: 'cart/decreaseQuantity',
                payload: item.id,
              })}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>−</Text>
            </Pressable>

            <Text style={styles.quantityValue}>
              {cartItem.quantity}
            </Text>

            <Pressable
              onPress={handleAdd}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.addButton}
            onPress={handleAdd}>
            <Text style={styles.addText}>ADD</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 154,
    backgroundColor: colors.white,
    borderRadius: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  imageContainer: {
    height: 115,
    backgroundColor: '#F7F8F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 54,
  },

  discount: {
    position: 'absolute',
    top: 8,
    left: 0,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },

  discountText: {
    color: '#15803D',
    fontSize: 9,
    fontWeight: '700',
  },

  details: {
    padding: 10,
  },

  name: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    height: 32,
  },

  quantity: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 5,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 7,
  },

  price: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },

  mrp: {
    fontSize: 11,
    color: colors.secondaryText,
    textDecorationLine: 'line-through',
  },

  addButton: {
    height: 32,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  addText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },

  quantityContainer: {
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 12,
  },

  quantityButton: {
    paddingHorizontal: 10,
  },

  quantityButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },

  quantityValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
});

export default ProductCard;


import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';

import { useSelector } from 'react-redux';

import CartItem from '../../components/CartItem/CartItem';

import { selectCartSummary } from '../../redux/selectors/cartSelectors';

import colors from '../../constants/colors';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);

  const summary = useSelector(selectCartSummary);

  const {
    itemCount,
    subtotal,
    totalSavings,
    deliveryFee,
    handlingFee,
    grandTotal,
  } = summary;

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🛒</Text>

      <Text style={styles.emptyTitle}>
        Your cart is empty!
      </Text>

      <Text style={styles.emptySubtitle}>
        Add some products to get started.
      </Text>

      <Pressable
        style={styles.shopButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.shopButtonText}>
          START SHOPPING
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      {/* HEADER */}

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View style={styles.headerDetails}>
          <Text style={styles.headerTitle}>My Cart</Text>

          <Text style={styles.headerSubtitle}>
            {itemCount} items
          </Text>
        </View>

        <View style={{ width: 35 }} />
      </View>

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CartItem item={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ListHeaderComponent={
              <View style={styles.deliveryMessage}>
                <Text style={styles.deliveryEmoji}>⚡</Text>

                <View>
                  <Text style={styles.deliveryTitle}>
                    Delivery in 12 minutes
                  </Text>

                  <Text style={styles.deliverySubtitle}>
                    Your groceries will arrive soon.
                  </Text>
                </View>
              </View>
            }
            ListFooterComponent={
              <View>
                {/* ADD MORE ITEMS */}

                <Pressable
                  style={styles.addMore}
                  onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.addMoreText}>
                    + Add more items
                  </Text>
                </Pressable>

                {/* BILL SUMMARY */}

                <View style={styles.billContainer}>
                  <Text style={styles.billTitle}>
                    Bill details
                  </Text>

                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>
                      Item total
                    </Text>

                    <Text style={styles.billValue}>
                      ₹{subtotal}
                    </Text>
                  </View>

                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>
                      Delivery fee
                    </Text>

                    <Text style={styles.billValue}>
                      {deliveryFee === 0
                        ? 'FREE'
                        : `₹${deliveryFee}`}
                    </Text>
                  </View>

                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>
                      Handling fee
                    </Text>

                    <Text style={styles.billValue}>
                      ₹{handlingFee}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.billRow}>
                    <Text style={styles.grandTotalLabel}>
                      Grand total
                    </Text>

                    <Text style={styles.grandTotalValue}>
                      ₹{grandTotal}
                    </Text>
                  </View>

                  {totalSavings > 0 && (
                    <View style={styles.savingsContainer}>
                      <Text style={styles.savingsText}>
                        You saved ₹{totalSavings} on this order!
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.footerNote}>
                  <Text style={styles.footerNoteText}>
                    Thank you for shopping with QuickBasket ❤️
                  </Text>
                </View>
              </View>
            }
          />

          {/* CHECKOUT FOOTER */}

          <View style={styles.checkoutContainer}>
            <View>
              <Text style={styles.checkoutLabel}>
                Total amount
              </Text>

              <Text style={styles.checkoutPrice}>
                ₹{grandTotal}
              </Text>
            </View>

            <Pressable
              style={styles.checkoutButton}
              onPress={() =>
                navigation.navigate('Checkout')
              }>
              <Text style={styles.checkoutButtonText}>
                Proceed to Checkout →
              </Text>
            </Pressable>
          </View>
        </>
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
    height: 68,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  backButton: {
    fontSize: 35,
    color: colors.text,
  },

  headerDetails: {
    marginLeft: 15,
    flex: 1,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
  },

  headerSubtitle: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 3,
  },

  list: {
    padding: 16,
    paddingBottom: 20,
  },

  deliveryMessage: {
    backgroundColor: colors.lightGreen,
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  deliveryEmoji: {
    fontSize: 27,
    marginRight: 12,
  },

  deliveryTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  deliverySubtitle: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 4,
  },

  addMore: {
    paddingVertical: 15,
    alignItems: 'center',
  },

  addMoreText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },

  billContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },

  billTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  billLabel: {
    fontSize: 13,
    color: colors.secondaryText,
  },

  billValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },

  grandTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },

  grandTotalValue: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },

  savingsContainer: {
    backgroundColor: colors.lightGreen,
    padding: 11,
    borderRadius: 8,
    marginTop: 12,
  },

  savingsText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },

  footerNote: {
    padding: 20,
    alignItems: 'center',
  },

  footerNoteText: {
    fontSize: 11,
    color: colors.secondaryText,
  },

  checkoutContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  checkoutLabel: {
    fontSize: 11,
    color: colors.secondaryText,
  },

  checkoutPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 3,
  },

  checkoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 19,
    paddingVertical: 15,
    borderRadius: 10,
  },

  checkoutButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  emptyEmoji: {
    fontSize: 75,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
  },

  emptySubtitle: {
    fontSize: 13,
    color: colors.secondaryText,
    marginTop: 8,
  },

  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  shopButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});

export default CartScreen;

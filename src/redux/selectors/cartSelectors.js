
import { createSelector } from '@reduxjs/toolkit';

const selectCartItems = state => state.cart.items;

export const selectCartSummary = createSelector(
  [selectCartItems],
  items => {
    const itemCount = items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const mrpTotal = items.reduce(
      (total, item) => total + item.mrp * item.quantity,
      0,
    );

    const totalSavings = mrpTotal - subtotal;

    const deliveryFee =
      subtotal === 0 ? 0 : subtotal >= 199 ? 0 : 25;

    const handlingFee = subtotal === 0 ? 0 : 5;

    const grandTotal =
      subtotal + deliveryFee + handlingFee;

    return {
      itemCount,
      subtotal,
      mrpTotal,
      totalSavings,
      deliveryFee,
      handlingFee,
      grandTotal,
    };
  },
);

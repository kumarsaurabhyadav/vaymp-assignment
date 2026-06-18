import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BagItem {
  id: string | number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  size: string;
  quantity: number;
  bagId: string;
}

interface BagState {
  items: BagItem[];
}

const initialState: BagState = {
  items: [],
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addToBag: (state, action: PayloadAction<BagItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromBag: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.bagId !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.bagId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.bagId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.bagId !== action.payload);
      }
    },

    clearBag: (state) => {
      state.items = [];
    },

    setBagItems: (state, action: PayloadAction<BagItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToBag, removeFromBag, increaseQuantity, decreaseQuantity, clearBag, setBagItems } =
  bagSlice.actions;

export default bagSlice.reducer;

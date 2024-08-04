import { createSlice } from '@reduxjs/toolkit';

// 创建一个 Redux slice，用于管理购物车状态
export const CartSlice = createSlice({
  // slice 的名称
  name: 'cart',
  
  // slice 的初始状态
  initialState: {
    items: [], // 初始化 items 为空数组
  },
  
  // 定义 reducers 来处理状态更新
  reducers: {
    // 添加商品到购物车
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // 从 action.payload 中解构出商品属性
      const existingItem = state.items.find(item => item.name === name); // 查找购物车中是否已经存在此商品
      
      if (existingItem) {
        // 如果商品已存在，则增加数量
        existingItem.quantity++;
      } else {
        // 如果商品不存在，则将其添加到购物车，并设置数量为 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    // 从购物车中移除商品
    removeItem: (state, action) => {
      // 通过过滤移除购物车中名称匹配的商品
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    // 更新商品的数量
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // 从 action.payload 中解构出商品名称和数量
      const itemToUpdate = state.items.find(item => item.name === name); // 查找需要更新的商品
      
      if (itemToUpdate) {
        // 如果商品存在，则更新其数量
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// 导出 actions，供组件调用
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// 导出 reducer，用于配置 Redux store
export default CartSlice.reducer;

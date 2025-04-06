import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ShopContext = createContext();

const initialState = {
  cartItems: [],
  wishlist: []
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        const newCartItems = [...state.cartItems];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + 1
        };
        return {
          ...state,
          cartItems: newCartItems
        };
      } else {
        // Add new item to cart
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: []
      };
      
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
      
    default:
      return state;
  }
};

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  
  const contextValue = useMemo(() => ({
    cartItems: state.cartItems,
    wishlist: state.wishlist,
    addToCart: (product) => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    },
    removeFromCart: (productId) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    },
    updateQuantity: (productId, quantity) => {
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id: productId, quantity } 
      });
    },
    clearCart: () => {
      dispatch({ type: 'CLEAR_CART' });
    },
    addToWishlist: (product) => {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  }), [state.cartItems, state.wishlist]);
  
  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

ShopProvider.propTypes = {
  children: PropTypes.node.isRequired
};
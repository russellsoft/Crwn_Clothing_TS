import { CART_ACTION_TYPES, CartItem } from './cart.types'
import { setIsCartOpen, setCartItems } from './cart.action'
import { AnyAction } from 'redux'

export type CartState = {
	isCartOpen: boolean,
	cartItems: CartItem[]
}

export const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: []
}

export const cartReducer = (
	state = CART_INITIAL_STATE,
	action = {} as AnyAction // HERE
): CartState => {
	if (setIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload
		}
	}

	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload
		}
	}

	return state
}
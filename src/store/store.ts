import { compose, createStore, applyMiddleware, Middleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/es/storage/session'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga'
import { rootReducer } from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
	}
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
	whiteList: (keyof RootState)[]
}

const sagaMiddleware = createSagaMiddleware()

const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware]
	.filter((middleware): middleware is Middleware => Boolean(middleware))

const persistConfig:ExtendedPersistConfig = {
	key: 'root', 
	storage,
	whiteList: ['cart']
}

const composedEnchancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
	|| compose

const composedEnchancers = composedEnchancer(applyMiddleware(...middleWares))

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composedEnchancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
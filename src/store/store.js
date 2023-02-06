import { compose, createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage/session'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga'
import { rootReducer } from './root-reducer'

const sagaMiddleware = createSagaMiddleware()

const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean)

const persistConfig = {
	key: root, 
	storage,
	whiteList: 'cart'
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
import { createAction, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types"

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category> // HERE!

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export type CreateAction =
	| FetchCategoriesStart
	| FetchCategoriesSuccess
	| FetchCategoriesFailed

export const fetchCategoriesStart = (): FetchCategoriesStart => {
	return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
}

export const fetchCategoriesSuccess = (categoriesArray: Category): FetchCategoriesSuccess => {
	return createAction(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray)
}

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed => {
	return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
}
import {TABLE_ACTIONS} from './ActionsConfig'

export const MyTableReducer = function (state:any, action: any) {
    switch (action.type) {
        case TABLE_ACTIONS.SET_TABLE_DATA:
            return {
                ...state, ...action.payload,
            }
        case TABLE_ACTIONS.SET_PAGE:
            return {
                ...state,page:action.payload,
            }
        case TABLE_ACTIONS.SET_ROWS_PER_PAGE:
            return {
                ...state,
                rowsPerPage:action.payload,
            }
        default:
            return state;
    }
}
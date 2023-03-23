import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import searchOp from './searchOp'

const rootReducer = (state, action) => {
    switch(action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload
            };
    }

    return combineReducers({
        searchOp
    })(state,action)
}

export default rootReducer;
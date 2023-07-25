import {
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    CLEAR_ERRORS,
} from "../Constants/ReviewConstants";

export const reviewReducer = (
    state = {
        reviews: []
    },
    action
) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                loading: true,
                reviews: []
            };
        case ALL_REVIEW_SUCCESS:
            return {
                // this action is comming from productAction
                loading: false,
                reviews: action.payload,
                // productListLength: action.payload.productListLength,
            };
        case ALL_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

import { ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ERRORS } from "../Constants/ReviewConstants";
import axios from "axios";
export const getProductReviews = (deviceOptions = [] , ratingOptions =[] , versionOptions = [], reviewOptions = [], likeOptions =[] , keyword ="") => async (dispatch) => {
    try {
        // this is fetching data from backend
        dispatch({
            type: ALL_REVIEW_REQUEST,
        });
        // let link = `http://localhost:8080/api/v1/reviews?deviceOptions=${deviceOptions}&ratingOptions=${ratingOptions}&versionOptions=${versionOptions}&reviewOptions=${reviewOptions}&likeOptions=${likeOptions}&keyword=${keyword}`
        let link = `https://reviewfeed.onrender.com/api/v1/reviews?deviceOptions=${deviceOptions}&ratingOptions=${ratingOptions}&versionOptions=${versionOptions}&reviewOptions=${reviewOptions}&likeOptions=${likeOptions}&keyword=${keyword}`

        const { data } = await axios.get(link);
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response,
        });
    }
};


// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

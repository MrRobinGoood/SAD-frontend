import {TOGGLE_IS_FETCHING, FILE_LOAD, RESULT_DOWNLOAD} from "../consts";

const initialState = {
    isFetching: false,
    Files : [],
    Result: [
        {
            "fileName": "dogovor-soglashenie",
            "class": "contract"
        },
        {
            "fileName": "documenta",
            "class": "order"
        },
        {
            "fileName": "dogovor-soglashenie",
            "class": "contract"
        },
        {
            "fileName": "documenta",
            "class": "order"
        },

    ]
}



export const Reducer = (state = initialState, action) => {
    switch (action.type){
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case FILE_LOAD:
            return {...state, Files: action.Files}
        case RESULT_DOWNLOAD:
            return {...state, Result: action.Result}
        default:
            return state
    }
}
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleLoadFile = (Files) => ({type: FILE_LOAD,Files})
export const toggleResult = (Result) => ({type: RESULT_DOWNLOAD,Result})




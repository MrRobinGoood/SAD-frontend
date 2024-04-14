import {INFO_PAGE, LOAD_FILE_PAGE} from "./consts";
import {LoadFilePageContainer} from "./LoadFilePage/LoadFilePage";
import {InfoPageContainer} from "./InfoPage/InfoPage";

export const AllRouters = [
    {
        path: LOAD_FILE_PAGE,
        Component:<LoadFilePageContainer/>
    },
    {
        path: INFO_PAGE,
        Component:<InfoPageContainer/>
    },
]
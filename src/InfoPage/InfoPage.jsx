import React from "react";
import s from "./InfoPage.module.scss"
import {connect, useSelector} from "react-redux";
import Loader from "../UI/Loader/loader";
function InfoPage({isFetching}) {
    const Result = useSelector(state => state.Result)

    return (
        <div>
            {isFetching ? <Loader/> :
                <div className={s.container}>
                    <div className={s.wrapper}>
                        <h2>Результаты обработки</h2>
                        <ul className={s.text}>
                            {Result.map((file, index) => (
                                <li key={index}>
                                    Файл {index+1} : {file.fileName} - {file.class}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    Result: state.Result,
    isFetching: state.isFetching,
})

export const InfoPageContainer = connect(mapStateToProps,)(InfoPage)
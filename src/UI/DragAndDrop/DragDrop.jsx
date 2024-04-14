import s from "./DragDrop.module.scss"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toggleLoadFile, toggleResult} from "../../redux/reducer";
import {toggleIsFetching} from "../../redux/reducer";
import axios from "axios";
import {INFO_PAGE} from "../../consts";
import { connect } from "react-redux";

const DragDrop = ({props}) => {
    const [ drag,setDrag ] = useState(false);
    const [ disabled,setDisabled ] = useState(false)
    const dispatch = useDispatch();
    const inputRef = React.useRef(null);
    const navigate = useNavigate()
    const Files = useSelector(state => state.Files)
    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler (e)  {
        e.preventDefault()
        const newFiles = Array.from(e.dataTransfer.files);
        dispatch(toggleLoadFile(newFiles))
        setDrag(false)
        setDisabled(true)
    }
    function handleChange (e) {
        e.preventDefault();
        const files = e.target.files;
        const newFiles = Array.from(files);
        dispatch(toggleLoadFile(newFiles));
        setDisabled(true);
    }

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleClick = async (e)  =>{
        dispatch(toggleIsFetching(true))
        e.preventDefault()
        navigate(INFO_PAGE)
        const formData = new FormData()
        Files.forEach((file) => formData.append("files", file));
        try{
            await axios({
                method: "post",
                url: "http://localhost:8000/class",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(response =>{
                    dispatch(toggleIsFetching(false))
                    dispatch(toggleResult(response.data))
                }
            )
        } catch (error){
            console.log(error)
        }
    }

    return (
            <div className={s.dragDrop}>
                <div className={s.container}>
                {drag
                    ? <div
                        onDragStart={e=> dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e => onDropHandler(e)}
                        className={s.dropAreaAfter}>
                        Отпустите файлы, чтобы загрузить их</div>
                    : <div
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                     className={s.dropArea}>
                        <input ref={inputRef} type="file" className={s.DragInput} onChange={handleChange} accept=".pdf,.docx,.xlsx" multiple={true}/>
                        <button className={s.DragButton} onClick={onButtonClick}>Нажмите или перетащите файл в область</button>
                    </div>
                }
                {disabled && Files.length > 0 ? (
                    <ul className={s.text}>
                        {Files.map((file, index) => (
                            <li key={index}>
                                Файл {index + 1}: {file.name} (Размер: {file.size} кб)
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={s.text1}>Вы не загрузили ни один файл для обработки</div>
                )}
                {disabled && Files.length > 0 ? (
                    <button onClick={handleClick} className={s.button}>Отправить</button>
                ) : null}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    Result: state.Result,
    isFetching: state.isFetching,
})

export const DragDropContainer = connect(mapStateToProps,)(DragDrop)


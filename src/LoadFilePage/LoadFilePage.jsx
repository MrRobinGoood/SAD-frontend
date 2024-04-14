import React from "react";
import DragDrop, { DragDropContainer } from "../UI/DragAndDrop/DragDrop";
import { connect } from "react-redux";
export function LoadFilePage() {
    return (
       <div>
            <DragDropContainer/>
       </div>
    );
}

const mapStateToProps = (state) => ({
    Result: state.Result,
    isFetching: state.isFetching,
})

export const LoadFilePageContainer = connect(mapStateToProps,)(LoadFilePage)
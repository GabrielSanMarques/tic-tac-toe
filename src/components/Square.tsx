import { useState } from "react";

type squareProps = {
    value: string,
    onClickEvent: Function,
}

export function Square(props: squareProps) {
    return (
        <button 
            className="square"
            onClick={() => props.onClickEvent()}
        >
            {props.value}
        </button>
    );
};
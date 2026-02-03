import React from "react";
import style from "./Info.module.css";

function Info() {

    return (
        <div className={style.infoPage}>
            <h1>About This Disney Library</h1>
            <p>This application was creted in 2026</p>
            <p>A modern Disney Library built with React and Reactstrap, allowing you to browse and search for your favorite Disney characters.</p>
        </div>
    )
}

export default Info;
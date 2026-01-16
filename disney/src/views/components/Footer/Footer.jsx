//Footer
import React from "react";
import {NavLink} from "react-router-dom";
import style from "./Footer.module.css";

function Footer(props) {
    const {courseName, courseLink, navItems} = props;

    const itemList = navItems.map((item) => {
        // removed activeClassName={style.active} from NavLink props
        return (
            <li key={item.url} className="nav-item">
                <NavLink to={item.url}>
                    {item.text}
                </NavLink>
            </li>
        )
    });

    return (
        <footer className={style.footer}>

            <div className="container-fluid">

                <div className="row">

                    <div className="col">
                        <nav className={style.footerNav}>

                            <ul className="nav flex-column">
                                {itemList}
                            </ul>

                        </nav>

                    </div>

                    <div className="col-md-auto">

                        <div className={`d-flex ${style.copyright}`}>

                            <div id={style.course}>
                                <a href={courseLink} target="_blank">
                                    {courseName}
                                </a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    )

}

export default Footer;
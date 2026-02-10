//Footer
import React from "react";
import {NavLink} from "react-router-dom";
import style from "./Footer.module.css";
import logoBicocca from "../../../assets/logoBicocca.png"
import logoDisney from "../../../assets/logo_disney.png"

//Costruzione del Footer: gli passiamo le props prese da MainTemplate
function Footer(props) {
    const {courseName, courseLink, navItems} = props;

    //Applichiamo il metodo map alla lista dei NavItems per associargli le rispettive view
    const itemList = navItems.map((item) => {
        return (
            <li key={item.url} className="nav-item">
                <NavLink to={item.url}>
                    {item.text}
                </NavLink>
            </li>
        )
    });

    //Visualizzazione del footer
    return (
        <footer className={style.footer}>
            <div className="container text-center">

                <div className="row align-items-center">
                    <div className="col xs:12 lg:3">
                        <img className={style.logoDisney}
                            src={logoDisney}
                            alt="logoDisney"/>
                    </div>


                <div className="col xs:12 lg:3">
                    <nav className={style.footerNav}>
                        <ul className="nav flex-column">
                            {itemList}
                        </ul>
                    </nav>
                </div>

                <div className="col xs:12 lg:3">

                    <div className={`d-flex ${style.copyright}`}>

                            <div id={style.course}>
                                <a href={courseLink} target="_blank">
                                    {courseName}
                                </a>
                                <p className={style.firma}>This Single Page Application was created by Annalisa Perrini and Gloria Tognoli</p>

                            </div>
                    </div>
                </div>

                <div className="col xs:12 lg:3">
                    <img className={style.logoBicocca}
                         src={logoBicocca}
                         alt="Università degli Studi di Milano-Bicocca"/>
                </div>

            </div>
        </div>

        </footer>
    )

}

export default Footer;
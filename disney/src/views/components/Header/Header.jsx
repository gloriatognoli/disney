//Header
import React, {useState} from 'react';
import {Collapse, Nav, Navbar, NavbarToggler, NavItem} from 'reactstrap';
import {NavLink} from "react-router-dom";
import style from "./Header.module.css";

//Costruzione dell'Header: vengono passati come props il logo ed i NavItems definiti in App.jsx
const Header = (props) => {
    const {logo, navItems} = props;

    //Gestione della visualizzazione responsive: inizialmente l'Header è chiuso (perchè in ottica mobile-first è chiuso)
    const [isOpen, setIsOpen] = useState(false);

    //Gestione del bottone toggle di apertura e chiusura dell'Header
    const toggle = () => setIsOpen(!isOpen);

    //Utilizzo del metodo map per assegnare ad ognuno degli elementi della NavBar dell'URL della pagina corrispondente
    //E renderizzazione della navbar
    const itemList = navItems.map((item) => {
        return (
            <NavItem key={item.url} className={style.navItem}>
                <NavLink to={item.url}
                         className={style.navItem}>
                    {item.text}
                </NavLink>
            </NavItem>
        )
    });

    //Return principale che renderizza tutta la pagina (quello di prima renderizzava gli elementi della NavBar dentro la variabile itemList,
    //alla quale vengono assegnati i NavItem
    return (
        <div className={style.navBar}>
            <Navbar expand="md">
                <div className={`container ${style.navbarContainer}`}>
                    <NavLink to="/">
                        <img className={style.logo} src={logo} alt=""/>
                    </NavLink>

                    {/* Gestione del bottone toggle nella versione mobile */}
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {itemList}
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>

    );
}

export default Header;


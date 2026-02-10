//Main Template
import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

//Definizione del template di base delle pagine:
//Passiamo come props gli elementi di Header e footer definiti in App.jsx
function MainTemplate(props) {
    const {
        children,
        footerCourseName, footerCourseLink,
        navItems,
        logo
    } = props;

    //Visualizzazione
    return (
        <>
            <Header
                logo={logo}
                navItems={navItems}
            />
            <div>

                {children}

            </div>
            <Footer
                courseName={footerCourseName}
                courseLink={footerCourseLink}
                navItems={navItems}
            />
        </>
    )
}

export default MainTemplate;

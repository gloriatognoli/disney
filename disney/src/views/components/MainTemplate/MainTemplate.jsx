//Main Template
import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function MainTemplate(props) {
    const {
        children,
        footerCourseName, footerCourseLink,
        navItems,
        logo
    } = props;

    return (
        <>
            <Header
                logo={logo}
                navItems={navItems}
            />
            <div className="my-5">

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

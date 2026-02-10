//Pagina Home
import React from "react";
import CharacterCardGrid from "../components/CharacterCardGrid/CharacterCardGrid.jsx"
import { NavLink } from "react-router-dom";
import {data} from "../../models/characters-data.json"
import style from "./Home.module.css"

//Costruzione della pagina Home:
//Applichiamo il metodo filter ai nostri dati iniziali (in characters-data.json) per mostrare 3 specifici personaggi
function Home() {
    const characterFiltered = data.filter((apiData) => apiData._id === 4703 || apiData._id === 1947 || apiData._id === 5371);

    //Visualizzazione della pagina Home
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">

                    <div className="my-5 text-center">

                        <h1 className={style.title}>
                            Welcome to Disney World!
                        </h1>
                        <CharacterCardGrid
                            characters={characterFiltered}
                            col={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}
                        />

                        <NavLink className={style.button} to="/Characters">Discover the characters</NavLink>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home;

//Pagina Home
import React from "react";
import CharacterCardGrid from "../components/CharacterCardGrid/CharacterCardGrid.jsx"
import { NavLink } from "react-router-dom";
import {data} from "../../models/characters-data.json"


function Home() {
    const characterFiltered = data.filter((apiData) => apiData._id === 4703 || apiData._id === 1947 || apiData._id === 5371);
    console.log(characterFiltered);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">

                    <div className="my-5 text-center">

                        <CharacterCardGrid
                            characters={characterFiltered}
                            col={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}
                        />
                        <NavLink className="button" to="/Characters">Gotta Catch 'em all</NavLink>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home;

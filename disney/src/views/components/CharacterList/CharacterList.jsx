//CharacterList
import React from "react";
import { NavLink } from "react-router-dom";
import { Table } from "reactstrap";
import style from "./CharacterList.module.css";
import logoDisney from "../../../assets/logo_disney.png"

//Gestione della visualizzazione List dei personaggi
function CharacterList (props)  {
    const {characters} = props;

    //Gestione del caso in cui non ci sia l'immagine definita per un personaggio:
    //     //Definiamo un'immagine di fallback (il nostro logo) e la richiamiamo in caso di Error
    const fallbackImage = logoDisney;
    const handleImageError = (e) => {
        console.warn("Couldn't load image, I'll use the fallback image");
        if (e.target.src !== fallbackImage) {
            e.target.src = fallbackImage;
        }
    };

    //Applichiamo il metodo map all'array dei personaggi (character) applicando ad ognuno la visualizzazione List (creiamo la riga di una
    //tabella
    const characterListRows = characters.map((character) => {
        const imageSrc = character.imageUrl || fallbackImage;
        return (
            <tr key={character._id} className="row-cols-1">
                <td className={style.listName}>{character.name}</td>
                <td>
                    <img src={imageSrc}
                         alt={character.name}
                         className={style.image}
                         onError={handleImageError}
                    />
                </td>
                {/* Link alla pagina CharacterDetail per ogni personaggio */}
                    <td className={style.detailsContainer}>
                        <NavLink to={`/Characters/${character._id}`} className={style.detailsLink}>Details</NavLink>
                    </td>
            </tr>
        )
    });

    //Return principale della tabella (List):
    return (
    <Table striped hover responsive className={style.table}>
        <thead>
        <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Details</th>
        </tr>
        </thead>
        <tbody>
            {characterListRows}
        </tbody>
    </Table>
    )
    }

    export default CharacterList;

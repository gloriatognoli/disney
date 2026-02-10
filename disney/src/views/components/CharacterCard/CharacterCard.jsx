//CharacterCard
import {Card, CardBody, CardImg, CardTitle} from "reactstrap";
import style from "./CharacterCard.module.css";
import {NavLink} from "react-router-dom";
import logoDisney from "../../../assets/logo_disney.png"

//Definizione delle CharacterCard:
//Gli passiamo le props, che sono i dati dei personaggi che vogliamo renderizzare nella Card (definiti nell'API)
function CharacterCard(props) {
    const {id, name, image} = props;

    //Gestione del caso in cui non ci sia l'immagine definita per un personaggio:
    //Definiamo un'immagine di fallback (il nostro logo) e la richiamiamo in caso di Error
    const fallbackImage = logoDisney;
    const imageSrc = image || fallbackImage;
    const handleImageError = (e) => {
        e.target.src = fallbackImage;
    };

//Renderizzazione della Card
    return (
        <NavLink to={`/Characters/${id}`}>
            <Card className={style.card}>
                <CardImg
                    loading="lazy"
                    className={style.imageUrl}
                    width="100%"
                    src={imageSrc}
                    alt={name}
                    onError={handleImageError}
                />
                <CardBody className="text-center">
                    <CardTitle
                        tag="h5"
                        className={`card-title`}>
                        {name}
                    </CardTitle>
                </CardBody>
            </Card>
        </NavLink>
    )
}

export default CharacterCard;
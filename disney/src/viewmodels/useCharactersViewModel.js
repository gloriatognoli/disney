//Qui va messo il comportamento dell'applicazione quando viene fatta la chiamata all'API e come gestire i dati
//È una custom hook

//// src/viewmodels/useCharactersViewModel.js
// import { useState, useEffect } from 'react';
// import { disneyService } from '../models/disneyService';
// import initialData from '../models/initialData.json'; // Se vuoi caricare dati locali
//
// export const useCharactersViewModel = () => {
//   // Inizializza lo stato con i dati del file JSON se vuoi, oppure con array vuoto
//   const [characters, setCharacters] = useState(initialData || []);
//
//   const loadCharacters = async () => {
//     const data = await disneyService.getCharacters();
//     setCharacters(data);
//   };
//
//   return { characters, loadCharacters };
// };
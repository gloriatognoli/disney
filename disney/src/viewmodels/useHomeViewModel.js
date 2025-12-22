//Qui va messa la logica specifica della pagina home, diversa da quella della pagina Characters

//// src/viewmodels/useHomeViewModel.js
// import { useState, useEffect } from 'react';
// import { disneyService } from '../models/disneyService';
//
// export const useHomeViewModel = () => {
//   const [featuredCharacters, setFeaturedCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         setLoading(true);
//         const data = await disneyService.getCharacters();
//         // Logica specifica della Home: prendiamo solo i primi 5
//         const topFive = data.slice(0, 5);
//         setFeaturedCharacters(topFive);
//       } catch (error) {
//         console.error("Errore nella Home:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchHomeData();
//   }, []);
//
//   return {
//     featuredCharacters,
//     loading,
//     welcomeMessage: "Benvenuti nel mondo Disney!"
//   };
// };
import React, { useEffect, useState } from "react";


// DK


export default function Biografier() {


  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"books" bruges til at lagre listen over bøger, og "isBooks" bruges til at kontrollere, om der er bøger at vise.
  const [books, setBooks] = useState([]);
  const [isBooks, setIsBooks] = useState(true);

  useEffect(() => {
    async function getBooks() {
      //Der defineres en URL til at hente bøgerne data fra vores Firebase-database.
      const url =
        "https://advanced-frontend-71bba-default-rtdb.europe-west1.firebasedatabase.app/books.json";

      //Her bruges "fetch" til hente bøgernes data fra vores Firebase-database og konverterer dem til JSON-format.
      const response = await fetch(url);
      const data = await response.json();

      //Hvis der er data tilgængelig, laves dataerne til et array og opdaterer "books" til at indeholde denne liste af bøger.
      if (data !== null) {
        const booksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBooks(booksArray);
      }

      //Hvis der ikke er nogen data tilgængelig, opdateres "isBooks" til "false" for at vise en meddelelse om, at der ikke er noget at vise.
      else {
        setIsBooks(false);
      }
    }
    getBooks();
  }, []);


  // Der laves en skyggeliste for den pågældende kategori, som filterer efter kategori.

  /* books er en liste over alle bøger og deres attributter, herunder "kategori". 
  Med filter-metoden oprettes en ny liste ved at filtrere elementerne i books-listen baseret på betingelsen book.kategori.includes(" ").
  Hvis en drink indeholder tekststrengen biografier i kategoriattributten returneres true. Ellers false.
  Hvis der returneres true, vises elementet i skyggelisten. Ellers ikke. */

  const biografierListe = books.filter((book) => 
    book.kategori.includes("biografier")
  );



    
}
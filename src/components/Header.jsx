import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Logo from "../images/kfm-logo.png"
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Login from "./Auth/Login";
import Opret from "./Auth/Opret";

//SD
export default function Header() {
    
  //Burger Menu SD
    const [txtMenuDisplay, setTxtMenuDisplay] = useState('none');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);

    const toggleTxtMenu = () => {
        setTxtMenuDisplay((prevDisplay) => (prevDisplay === 'none' ? 'flex' : 'none'));
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 950);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

  //Dropdown
    const [dropDownDisplay, setDropDownDisplay] = useState('none');

    const dropDownMenu = () => {
      setDropDownDisplay((preDisplay) => (preDisplay === 'none' ? 'flex' : 'none'));
    };

  //Slide in sidebar
    const [logSlide, setLogSlide] = useState(false);

    const showLogSlide = () => setLogSlide(!logSlide)

    const [opretSlide, setOpretSlide] = useState(false);

    const showOpretSlide = () => setOpretSlide(!opretSlide)





  //Søg  
  // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
  //"books" bruges til at lagre listen over bøger, og "isBooks" bruges til at kontrollere, om der er bøger at vise.
  const [books, setBooks] = useState([]);
  const [isBooks, setIsBooks] = useState(true);

  // Til søgefunktion
  const [soegeTekst, setSoegeTekst] = useState("");
  const [skyggeBogListe, setSkyggeBogListe] = useState([]);

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
        setSkyggeBogListe(booksArray);

      }

      //Hvis der ikke er nogen data tilgængelig, opdateres "isBooks" til "false" for at vise en meddelelse om, at der ikke er noget at vise.
      else {
        setIsBooks(false);
      }
    }
    getBooks();
  }, []);


    return (
            <header>
              {/*Søg wrap = første stribe med søg feltet */}
                <section className="sog-wrap">
                    <div className="sog">
                        <form>
                            <input type="search" required value={soegeTekst} placeholder="Indtast søgning" onChange={(e) => setSoegeTekst(e.target.value)}/>
                            <button>Søg</button>
                        </form>
                    </div>
                </section>

              {/*Striben med logo billedet*/}
                <section className="logo">
                    <div className="logo-wrap">
                        <img src={Logo}/>
                    </div>
                </section>

              {/*Navigationen*/}
                <nav>
                    <div className="header-wrap">
                       
                      {/*Knappen som åbner burger menu'en,
                      Er kun synlig i mindre skærme*/}
                        <button className="burger-menu" onClick={toggleTxtMenu}>
                            <MenuSharpIcon />
                        </button>

                      {/*Venstre side af navigatione,
                      den med kun tekst*/}
                        <div className="txt-menu" style={{ display: isMobile ? txtMenuDisplay : 'flex' }}>
                            <div className="menu-wrap">
                                <a className="menupunkt">Forside</a>
                                <NavLink to="/" className="menupunkt" onClick={toggleTxtMenu}>Køb Bøger</NavLink>
                                <a className="menupunkt">Køb Moleskine</a>
                                <a className="menupunkt">Bøger vi anbefaler</a>
                                <a className="menupunkt info">
                                    <p>Information</p>
                                    <ArrowDropDownIcon/>
                                </a>
                                <a className="menupunkt">Eventkalender</a>
                            </div>
                        </div>

                      {/*Højre siden af navigationen,
                      Den med ikonerne*/}
                        <div className="icon-menu">
                            
                          {/*Profil wrap med drop down*/}
                            <div className="iconpunkt profil" onClick={dropDownMenu}>
                                
                              {/*Profil knappens context*/}
                                <p>Min Profil</p>
                                <PersonSharpIcon/>
                                
                              {/*Drop downen med log ind og opret knapperne*/}
                                <div style={{ display: dropDownDisplay }}>
                                  <section className="drop">
                                    <h1>Du er ikke logget ind</h1>
                                    <Link className="profilbtn" to="#" onClick={showLogSlide}>Log Ind</Link>
                                    <div className="eller">
                                        <span></span>
                                        <h2>eller</h2>
                                        <span></span>
                                    </div>
                                    <Link className="profilbtn" to="#" onClick={showOpretSlide}>Opret Profil</Link>
                                  </section>
                                </div>
                            </div>

                          {/*Slide in wrap,
                          med log ind og opret*/}
                            <div className={logSlide || opretSlide ? 'profil-wrap active' : 'profil-wrap'}>
                          
                          {/*Log in sidebar - Slide in*/}
                              <section className={logSlide ? 'sidebar active' : 'sidebar'}>
                                <CloseSharpIcon onClick={showLogSlide}/>
                                <Login />
                              </section>

                          {/*Opret bruger sidebar - Slide in*/}
                              <section className={opretSlide ? 'sidebar active' : 'sidebar'}>
                                <CloseSharpIcon onClick={showOpretSlide}/>
                                <Opret />
                              </section>
                          {/*Mørk baggrund*/}
                              <span className="bg"></span>
                            </div>

                          {/*Favorit knap*/}
                            <NavLink to="/favoritside" className="iconpunkt">
                                <p>Dine Favoritter</p>
                                <FavoriteSharpIcon/>
                            </NavLink>
                            <a className="iconpunkt kurv">
                                <p>Din indkøbskurv er tom</p>
                                <div className="kurv-wrap"><ShoppingCartSharpIcon/></div>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
    )
}
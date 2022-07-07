import '../css/header/header.css'
import '../css/header/header-p/header-p.css'
import '../css/header/header-h1/header-h1.css'

export default function Header({ booksFound }){
    return(
        <header id="header" className="header">
                <h1 className="header-h1">Search for books</h1>
                {booksFound && <p className="header-p">Найдено книг: { booksFound }</p>}
        </header>
    )    
}
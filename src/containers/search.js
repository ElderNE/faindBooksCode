import { connect } from 'react-redux';
import { setOneBook  } from '../actions';
import '../css/search/book/book.css';
import '../css/search/book/book-p.css';
import '../css/search/book/book-img.css';
import '../css/search/bigBook/bigBook-button.css';
import '../css/search/bigBook/bigBook-img.css';
import '../css/search/bigBook/bigBook-p.css';
import '../css/search/bigBook/bigBook-text.css';
import '../css/search/main.css';
import missingLogo from '../img/book.jpg';

function Search(props) {

    const { setOneBookAction } = props;
    
    //переменные для отображения текстов на карточке
    let srcOneBookLink="";
    let OneBookAuthors="";
    let OneBookTitle="";
    let OneBookCategories="";
    let OneBookDescription="";

    //сборка содержимого выделенной карточки
    if (props.oneBook < 30) {
        //изображение
        let jCshort=props.jsonContainer.items[props.oneBook].volumeInfo;
        srcOneBookLink=jCshort.imageLinks.thumbnail;
        //авторы
        for (let key in jCshort.authors) {
            if (OneBookAuthors !== "") {
                OneBookAuthors += "," + jCshort.authors;
            }    
            else {
                OneBookAuthors += jCshort.authors;
            }    
        }
        //категории
        for (let key in jCshort.categories) {
            if (OneBookCategories !== "") {
                OneBookCategories += "," + jCshort.categories;
            }    
            else {
                OneBookCategories += jCshort.categories;
            }    
        }
        //заголовок
        if (jCshort.title)
            OneBookTitle=jCshort.title;
        //описание    
        if (jCshort.description)
            OneBookDescription=jCshort.description;
    }

    //сборка маленьких карточек
    if ( Array.isArray(props.jsonContainer.items) ) {
        const elements=[];
        for (let i = 0; i < props.jsonContainer.items.length; i++) {
            let authors="";
            let jCshort=props.jsonContainer.items[i].volumeInfo;
            let title=jCshort.title;
            let categories="";
            let srcLink="";
            //сборка списка авторов
            for(let key in jCshort.authors) {
                if (authors !== "") {
                    authors += "," + jCshort.authors;
                }    
                else {
                    authors += jCshort.authors;
                }    
            }
            //сборка списка категорий, выводит только первую не пустую
            for(let key in jCshort.categories) {
                if (categories === "") {
                    categories += jCshort.categories;
                } 
            }
            //проверка наличия объекта со сслыками, если нет картинки, будет грузится запасная,
            //релизовано в сборке элемента img
            if(jCshort.imageLinks)
                srcLink=jCshort.imageLinks.thumbnail;
            elements.push(
                <div key={i} className="book" onClick={ () => setOneBookAction(i) }>
                    <img src={ srcLink ? srcLink : missingLogo } className="book-img" width={150} height={220} alt="found book"></img>
                    <p className="book-p">{ authors.substring(0,180) }</p>
                    <h4 className="book-h4">{ title.substring(0, 90) }</h4>
                    <p className="book-p">{ categories.substring(0, 30) }</p>
                </div>
            );
        }
    
        return(
            <>
                { (props.oneBook < 30)  && <div className="main-gotBook">
                        <div className="bigBook-img">
                            <img src={srcOneBookLink ? srcOneBookLink : missingLogo} className="bigBook-img__margins"  width="70%" height="100%" alt="found one book"></img>
                        </div>
                        <div className="bigBook-text">
                            <button type="button" className="bigBook-button" onClick={ () => setOneBookAction(31) }>Х</button>
                            <p className="bigBbook-p">Authors:</p>
                            <p className="bigBook-p__high">{ OneBookAuthors.substring(0,135) }</p>
                            <p className="bigBbook-p">Title:</p>
                            <h4 className="book-h4">{ OneBookTitle.substring(0,180) }</h4>
                            <p className="bigBbook-p">Description:</p>
                            <p className="bigBook-p__high">{ OneBookDescription.substring(0,330) }</p>
                            <p className="bigBbook-p">Categories:</p>
                            <p className="bigBook-p__high">{ OneBookCategories.substring(0,90) }</p>
                        </div>
                    </div>
                }
                <div className="main-resault">
                    { elements }
                </div>
            </> 
        )
    }
}

const mapStateToProps = store => {
    return {
      oneBook: store.search.oneBook,
      jsonContainer: store.app.jsonContainer,
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    setOneBookAction: text => dispatch(setOneBook(text)),
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
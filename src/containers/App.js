
import { connect } from 'react-redux';
import { setFullText, setCategories, setSortingBy, setStartIndex, waitSearching, setMain, setJasonContainer  } from '../actions';
import '../css/app/main/main.css';
import '../css/app/main//main-button/main-button.css';
import '../css/app/main/main-input/main-input.css';
import '../css/app/main/main-label/main-label.css';
import '../css/app/main/main-select/main-select.css';
import '../css/app/footer/footer.css';
import '../css/app/footer/footer-button/footer-button.css';
import searchLogo from '../img/magnifying-glass-solid.svg';
import Search from '../containers/search';
import Header from '../components/header';

import { useEffect } from 'react';

function App(props) {

  const { setFullTextAction, 
    setCategoriesAction, 
    setSortingByAction, 
    setStartIndexAction, 
    waitSearchingAction,
    setMainAction,
    setJasonContainerAction } = props;

  //текст из input
  let text = '';
  function setText(e){
    text=e;
  }

  //старотовая позиция в поиске
  function setCounter(e) {
    if ( Array.isArray(props.jsonContainer.items) && (props.jsonContainer.items.length === 30) )
      setStartIndexAction(props.startIndex+30);
  }
  
  //подключение
  useEffect(() => {
    async function getData(){
      const task = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${props.fullText}+subject:${props.categories}&printType=books&maxResults=30&startIndex=${props.startIndex}&&orderBy=${props.sortingBy}`);
      const answer =  await task.json();
      if (answer) {
        setJasonContainerAction(answer);
        waitSearchingAction(false);
      }
    }
    if (props.fullText) {
      getData();
    }
  },[props.fullText, props.startIndex, props.categories, props.sortingBy]);
  
  //счетчик книг
  let booksFound = props.jsonContainer.totalItems;

  //нажатие на поиск
  function setSet() { 
    if(text) {
      if(!Array.isArray(props.jsonContainer.items))
        waitSearchingAction(true);
      setFullTextAction(text);
      setMainAction('1'); 
      setText('');
    }  
  }

  return (
    <>
      <Header booksFound = { booksFound }/>
      <main className={"main main__pappingTop"+props.main}>
        <form className="main-search" onSubmit={(e)=>{setSet(); e.preventDefault()}}>
          <div className="main-text">
            <input className="main-input" type="text" maxLength={100} onChange={(e)=>setText(e.target.value)}></input>
            <button className="main-button" type="submit"><img src={searchLogo} width={30} height={30} alt="Search Icon"/></button>
          </div>
          <div className="main-select__direction">
            <label className="main-label">Categories</label>
            <select className="main-select" onChange={ (e) => setCategoriesAction(e.target.value) }>
              <option value="">all</option>
              <option value="art">art</option>
              <option value="biography">biography</option>
              <option value="computers">computers</option>
              <option value="history">history</option>
              <option value="medical">medical</option>
              <option value="poetry">poetry</option>
            </select>
            <label className="main-label">Sorting by</label>
            <select className="main-select" onChange={ (e) => setSortingByAction(e.target.value) }>
              <option value="relevance">relevance</option>
              <option value="newest">newest</option>
            </select>
          </div>
        </form>
        { props.searching &&
          <div className="main-searching">
            <h2 className="main-searching__color">...Поиск книг</h2>
          </div>
        }   
        { 
          props.main==='1' && Array.isArray(props.jsonContainer.items) && <Search />
        }
      </main>
      { props.main==='1' && Array.isArray(props.jsonContainer.items) && 
        <footer className="footer">
          <button className="footer-button" onClick={ () => setCounter(30) }>Еще 30 книг</button>
          <a href="#header"><button className="footer-button">Наверх</button></a>
        </footer>
      }
    </>
  );
}

const mapStateToProps = store => {
  return {
    fullText: store.app.fullText,
    categories: store.app.categories,
    sortingBy: store.app.sortingBy,
    startIndex: store.app.startIndex,
    searching: store.app.searching,
    main: store.app.main,
    jsonContainer: store.app.jsonContainer,
  }
}

const mapDispatchToProps = dispatch => ({
  setFullTextAction: text => dispatch(setFullText(text)),
  setCategoriesAction: e => dispatch(setCategories(e)),
  setSortingByAction: text => dispatch(setSortingBy(text)),
  setStartIndexAction: numb => dispatch(setStartIndex(numb)),
  waitSearchingAction: searching => dispatch(waitSearching(searching)),
  setMainAction: txt => dispatch(setMain(txt)),
  setJasonContainerAction: obj => dispatch(setJasonContainer(obj))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
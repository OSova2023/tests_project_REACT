import { useState, useEffect } from 'react'
import './App.css'
import useFetchData from './api/useFetchData';
import styles from './styles/styles.js';
import TestItems from './components/testItems/TestItems.jsx';

const titleList = ['NAME', 'TYPE', 'STATUS', 'SITE'] 
 // особый порядок для статуса
 const statusOrderObj = {
  Online: 0,
  Paused: 1,
  Stopped: 2,
  Draft: 3,
};

function App() {
  const [inputText, setInputText] = useState('')
  const [sites, setSites] = useState([])
  const [tests, setTests] = useState([])
  const [filteredTests, setFilteredTests] = useState([])
  const [renderedTests, setRenderedTests] = useState([])
  const [boardEmpty, setBoardEmpty] = useState(false)
  const [sortOrder, setSortOrder] = useState({column: 'name', direction: 'asc'})

  const emptyComponent = <div className={styles.emptyBoardStyle}><p>Your search did not match any results.</p><p className='btn_reset bg-green-400 rounded-md' onClick={search.bind(this, '')}>Reset</p></div>

  // ИЗВЛЕЧЕНИЕ ДОМЕНА ИЗ URL
  function extractDomain(url) {
    if (typeof url !== 'string') {
      return null;
    }
    let withoutProtocol = url;
    if (url.startsWith('https://')) {
      withoutProtocol = url.substring(8);
    } else if (url.startsWith('http://')) {
      withoutProtocol = url.substring(7);
    } else {
      return null; 
    }  
    withoutProtocol.startsWith('www.') && (withoutProtocol = withoutProtocol.substring(4));
    const endOfDomain = withoutProtocol.indexOf('/');
    const domain = endOfDomain === -1 ? withoutProtocol : withoutProtocol.substring(0, endOfDomain);  
    return domain;
  }

  // СОРТИРОВКА МАССИВА
  const handleListFilter = (column) => { 

    // Устанавливаем, как сортировать список
    setSortOrder((prev) => {
      if (prev.column === column) { 
        return {
          column,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return { column, direction: 'asc' };
      }
    });

    const sortedTests = [...(filteredTests.length > 0 ? filteredTests : tests)].sort((a, b) => {
      if (sortOrder.column === 'name' || sortOrder.column === 'site' || sortOrder.column === 'type') {
        return sortOrder.direction === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);      
      } else if (sortOrder.column === 'status') {
        const orderA = statusOrderObj[a.status] 
        const orderB = statusOrderObj[b.status] 
        console.log(orderA, orderB)
        return sortOrder.direction === 'asc' ? orderA - orderB : orderB - orderA;
      } else {
        return 0;
      }
    });
    // устанавливаем отсортированный массив в состояние
    setFilteredTests(()=>[...sortedTests])
  }

  // ПОИСК ПО СТРОКЕ
  function search(input) {
    setInputText(input)
    setRenderedTests((filteredTests.length > 0 ? filteredTests : tests).filter(item => { 
      return item.name.toLowerCase().includes(input.toLowerCase())
    }))}

  // ОТОБРАЖЕНИЕ ПУСТОЙ СТРАНИЦЫ  
  useEffect(() => {    
    if(renderedTests.length === 0) {
    return setBoardEmpty(true)
  } else {
    return setBoardEmpty(false)
  }}, [renderedTests])    
  
  // Кастомный хук для получения данных с сервера
  useFetchData(extractDomain, setSites, setTests)
  
  // РЕНДЕРЛИСТ ТЕСТОВ
  useEffect(() => {setRenderedTests(filteredTests.length===0 ? tests : filteredTests)}, [filteredTests,tests])

  return (
    <div className={styles.container}>
      <header className='w-full'><div className={styles.dashboardDiv}>Dashboard</div></header>
      <main className={styles.main}>      
        <div className='input__container h-20 relative'>           
          <span className={styles.searchIcon}><img src='/images/search.png' alt='search' className='w-5 h-5'/></span>
          <input value={inputText} type='text' placeholder='What test are you looking for?' onChange={(e) => search(e.target.value)} className={styles.input}/>
          <span className={styles.inputResults}>{renderedTests.length} tests</span>
        </div> 
        { boardEmpty ? emptyComponent : <TestItems handleListFilter={handleListFilter} renderedTests={ renderedTests} titleList={titleList}/>}
      </main>  
    </div>
  )
}

export default App

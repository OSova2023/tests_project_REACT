import { useState, useEffect } from 'react'
import './App.css'
import TestList from './components/TestList/TestList'

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


  // ИЗВЛЕЧЕНИЕ ДОМ
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

  useEffect(() => {
    async function fetchData() {      
      const promise1 =  await fetch('http://localhost:3100/sites').then(res => res.json()).then(data => {
        setSites(data.map((item)=>{
          return {...item, exName: extractDomain(item.url)}
        }))
        return sites
      }).catch((err) => console.error('Error fetching sites:', err));    
      
      const promise2 = await fetch('http://localhost:3100/tests').then(res => res.json()).then(data => setTests(data)).catch((error) => console.error('Error fetching tests:', error));
      // НЕ РАБОТАЕТ
      Promise.all([promise1, promise2]).then(()=> (tests.length > 0 && sites.length > 0) &&  setTests(prev => 
        prev.map(item =>{ return {...item, site: sites.filter(site => site.id === item.siteId)[0].exName}}))
    );
    }
    fetchData()     
  }, [])

  
  
  // РЕНДЕРЛИСТ ТЕСТОВ
  useEffect(() => {setRenderedTests(filteredTests.length===0 ? tests : filteredTests)}, [filteredTests,tests])

  return (
    <div className='container bg-slate-100 h-screen w-full flex flex-col items-center text-slate-500'>
      <header className='font-bold flex justify-left'><div className='font-bold flex justify-left'>Dashboard</div></header>
      <main className='flex flex-col justify-between w-full text-xl'>      
        <div className='input__container h-20 relative'>           
          <span className="input__span absolute z-4 top-5 left-3 text-slate-200"><img src='/images/search.png' alt='search' className='w-5 h-5'/></span>
          <input value={inputText} type='text' placeholder='What test are you looking for?' onChange={(e) => search(e.target.value)} className='input relative rounded bg-white w-full h-10 pl-10'/>
          <span className="input__span_right absolute z-3 top-3 right-5 text-slate-300">{renderedTests.length} tests</span>
        </div> 
        { boardEmpty ?  <div className='main__empty-board flex flex-col justify-center items-center text-center text-2xl mt-50'><p>Your search did not match any results.</p><p className='btn_reset bg-green-400 rounded-md' onClick={search.bind(this, '')}>Reset</p></div>       
          :
          <div className='main'>          
            <div>
              <div className='flex flex-row justify-between items-center'>
                {titleList.map(item => <div key={item} onClick={()=>{handleListFilter(item.toLowerCase())}} className='main__titles-list cursor-pointer'>{item}</div>)}
              </div>                
            </div>
            <div className='main__test-list flex flex-col justify-between w-full gap-3'>
              {renderedTests.map(item => <TestList key={item.id} item={item} />)}
            </div>
          </div>  
        }
      </main>  
    </div>
  )
}

export default App

import styles from "../../styles/styles"
import TestList from '../testList/TestList'


export default function TestItems({handleListFilter, renderedTests, titleList}) {
  return (
    <div className='main'>          
            <div>
              <div className={styles.titleListStyle}>
                {titleList.map(item => <div key={item} onClick={()=>{handleListFilter(item.toLowerCase())}} className={`main__titles cursor-pointer ${item === 'NAME' ? 'col-span-3' : 'col-span-1'}`}
                >{item}</div>)}
              </div>                
            </div>
            <div className={styles.testListStyle}>
              {renderedTests.map(item => <TestList key={item.id} item={item} />)}
            </div>
          </div>
  )
}

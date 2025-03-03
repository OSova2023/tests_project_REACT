import React from 'react'
import './testList.css'
import { Link } from 'react-router'

export default function TestList({item}) {

  const colorStileMark = item.status === 'ONLINE' ? 'bg-red-500' : item.status === 'PAUSED' ? 'bg-fuchsia-700' : item.status === 'DRAFT' ? 'bg-blue-700' : 'bg-fuchsia-300'
  const colorStileStatus = item.status === 'ONLINE' ? 'text-green-500' : item.status === 'PAUSED' ? 'text-orange-500' : item.status === 'DRAFT' ? 'text-slate-600' : 'text-red-500'
  const buttonTextStatus = item.status === 'DRAFT' ? 'Finalize' : 'Results'
  const buttonColor = item.status === 'DRAFT' ? 'bg-slate-500' : 'bg-green-500'

  return (
    <li className='main__test-item grid grid-cols-8 w-full rounded-lg bg-white overflow-hidden relative hover:ring-4 hover:ring-gray-200 cursor-pointer'>        
      <div className={`absolute left-0 top-0 h-full w-1 ${colorStileMark} z-0`}></div>
      <div className='col-span-3 flex items-center'>{item.name}</div>
      <div className='flex items-center'>{item.type !== 'MVT' ? item.type.split('').map((el,i)=> {return i!==0 ? el.toLowerCase(): el}).join('') : item.type}</div>
      <div className={`flex items-center ${colorStileStatus}`}>{item.status.split('').map((el,i)=> {return i!==0 ? el.toLowerCase(): el}).join('')}</div>
      <div className= 'flex items-center col-span-2'>{item.site}</div> 
      <div className={`button flex items-center justify-center text-center ${buttonColor}`}><Link to={`/${buttonTextStatus.toLowerCase()}/:${item.id}`}>{buttonTextStatus}</Link></div>    
    </li>
  )
}

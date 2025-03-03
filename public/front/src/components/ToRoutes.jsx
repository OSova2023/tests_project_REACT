import '../App.css'
import { Link } from 'react-router'

export default function ToRoutes({title, content}) {
  return (
    <div className='container w-full bg-slate-50 h-screen w-full flex flex-col text-slate-500 relative'>
      <header className='font-bold w-full flex justify-left'><div className='font-bold flex text-left text-black'>{title}</div></header>
      <main><p className='w-full flex justify-left text-md text-black'>{content}</p></main>
      <footer className='absolute bottom-10 left-30 '>
        <nav  className='text-slate-400'>
          <Link to="/" className='text-black text-xl w-40 flex align-center'><span className='w-5 mx-5 align-center'>&lang;</span>Back</Link>
        </nav>
      </footer>
    </div>
  )
}

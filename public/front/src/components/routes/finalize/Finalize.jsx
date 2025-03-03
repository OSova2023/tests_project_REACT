import '../../../App.css'
import { Link } from 'react-router'


export default function Finalize() {
  return (
    <div className='container bg-slate-50 h-screen w-full flex flex-col items-center text-slate-500 relative'>
      <header className='font-bold flex justify-left'><div className='font-bold flex text-left text-black'>Finalize</div></header>
      <main><p className='text-md text-black'>Spring promotion</p></main>
      <footer className='absolute bottom-10 left-30 '>
        <nav  className='text-slate-400'>
          <Link to="/" className='text-black text-xl w-40 flex'><span className='w-10 mx-10 align-center'>&lang;</span>Back</Link>
        </nav>
      </footer>
    </div>
  )
}

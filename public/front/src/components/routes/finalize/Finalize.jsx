import '../../../App.css'
import ToRoutes from '../../toRoutes'

export default function Finalize() {
  const title = 'Finalize'
  const content = 'Spring promotion'
  return (
     <div>
        <ToRoutes title={title} content={content}/>
      </div>
  )
}

import { createLazyFileRoute } from '@tanstack/react-router'
import { Contact } from '../Contact'

export const Route = createLazyFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='contact'>
      <h1>Contact</h1>
      <Contact />
    </div>
  )
}

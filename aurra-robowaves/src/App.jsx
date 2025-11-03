

import './App.css'

import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'

const App = () => {
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
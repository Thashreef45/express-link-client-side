import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import CpRoutes from './routes/CpRoutes'
import NodalRoutes from './routes/NodalRoutes'
import ApexRoute from './routes/ApexRoutes'
import { ThemeProvider} from '@mui/material'
import {Theme} from '../src/components/theme-provider/theme'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Router>
         <ToastContainer />
          <Routes>
            <Route path='/cp/*' element={<CpRoutes />} />
            <Route path='/nodal/*' element={<NodalRoutes/>} />
            <Route path='/apex/*' element={<ApexRoute/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App

import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import CpRoutes from './routes/CpRoutes'
import NodalRoutes from './routes/NodalRoutes'
import ApexRoute from './routes/ApexRoutes'
import { ThemeProvider} from '@mui/material'
import {Theme} from '../src/components/theme-provider/theme'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'


function App() {

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Router>
         <ToastContainer />
          <Routes>

            {/* setting default to cp */}
            <Route path='/' element={<Navigate to='/cp'/>}/> 

            <Route path='/cp/*' element={<CpRoutes />} />
            <Route path='/nodal/*' element={<NodalRoutes/>} />
            <Route path='/apex/*' element={<ApexRoute/>}/>
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App

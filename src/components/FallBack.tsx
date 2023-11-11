import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import { Logo } from '../constants/Colors';
import Header from './Header';

const FallBack = () => {


  return (
    <>
      <Header role='cp' />
      <center className='mt-5'>
        <img src={Logo.Main}
          style={{ width: "20%" }} alt="" />
      </center>

      <Box sx={{ height: "60vh", width: "100%", display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Box>
    </>
  );
}

export default FallBack

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardsProps {
    title: string;
    link: string;
  }

const Cards = ({title,link}:CardsProps) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }} className='col-md-6 mb-5'>
            <a href={link} style={{ textDecoration: "none" }}>
                <Card sx={{ width: 350 }}>
                    <CardMedia
                        sx={{ height: 300, backgroundColor: "#26B99A" }}
                        // image="../../../public/images/Screenshot from 2023-07-13 17-41-51.png"

                        title={title}
                    />
                    <CardContent style={{ backgroundColor: "#556080", color: "#FFF" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                    </CardContent>
                </Card>
            </a>
        </div>
    )
}

export const Home = () => {
    const key  = localStorage.getItem('cpToken')
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3001/cp/home', {
          headers: {
            key
          }
        }).then((res)=>{
            // console.log('rsssssssss')
        }).catch((err)=>{
            // console.log(err)
            navigate('/cp/login')
        })
      },[]);
      

    return (
        <div className='container' style={{ display: "flex", justifyContent: "center" }} >
            <div className='row mt-5 container' style={{ display: "flex", justifyContent: "center" }}>
                <Cards link={'hi'} title={'Tracking'}></Cards>
                <Cards link={'hi'} title={'Pincode Search'}></Cards>
                <Cards link={'hi'} title={'My Bookings'}></Cards>
                <Cards link={'hi'} title={'My Delivery'}></Cards>
            </div>
        </div>
    );
}
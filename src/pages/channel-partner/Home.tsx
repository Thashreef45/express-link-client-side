import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CpInstance from '../../config/axiosInstances/axiosCp';
import { Button, CardActions, Container, Grid } from '@mui/material';
import { Colors } from '../../constants/Colors';
import { AxiosResponse } from 'axios';

interface GridCardProps {
    card: {
        name: string;
        link: string;
        image: string;
    };
    key: React.Key;
}

export const Home = () => {
    const key = localStorage.getItem('cpToken')
    const navigate = useNavigate()
    useEffect(() => {
        CpInstance.get('/home', {
            headers: {
                token: key
            }
        }).then((res: AxiosResponse) => {
            res = res
            // console.log(res.data,'data from backend')
        }).catch((err) => {
            console.log(err)
            if (key) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);

    return (
        <>
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card, index) => (
                            <GridCard key={index} card={card} />
                        ))}
                    </Grid>
                </Container>
            </main>

        </>
    );
}


const GridCard = ({ card, key }: GridCardProps) => {
    return (
        <Grid item key={key} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="div"
                    sx={{// 16:9
                        pt: '56.25%',
                        backgroundColor: Colors.PrimaryColor
                    }}
                    image={card.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                    </Typography>
                </CardContent >

                <CardActions>
                    <a href={card.link}>
                        <Button size="small">Browse</Button></a>
                </CardActions>
            </Card>
        </Grid>
    )
}




const cards = [
    {
        name: "Pincode Search",
        link: "/cp/pincode-search",
        image: '../../public/images/icons8-pin-100.png'
    },
    {
        name: "Tracking",
        link: "",
        image: "../../public/images/icons8-tracking-100.png"
    },
    {
        name: "My Booking",
        link: "",
        image: "../../public/images/icons8-booking-96.png"
    },
    {
        name: "My Delivery",
        link: "",
        image: "../../public/images/icons8-delivery-96.png"
    },
];
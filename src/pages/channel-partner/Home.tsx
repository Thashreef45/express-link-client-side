import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { Button, CardActions, Container, Grid } from '@mui/material';
import { Colors, Logo } from '../../constants/Colors';
import cpCards, { GridCardProps } from '../../constants/CardDatas/CpCards';
import Header from '../../components/Header';

const cards = cpCards

const Home = () => {

    const key = localStorage.getItem('cpToken')
    const navigate = useNavigate()
    useEffect(() => {
        CpInstance.get('/home').then().catch((err) => {
            console.log(err)
            if (key) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);

    return (
        <>
            <Header role='cp' />
            <center className='mt-4' >
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
            </center>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
                <h1 style={{ color: Colors.SecondaryColor, marginTop: '0px', marginBottom: '0px' }}>Channel Partner Dashboard</h1>
            </div>
            <Container sx={{ py: 8 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <GridCard key={card.name} card={card} />
                    ))}
                </Grid>
            </Container>
        </>
    );
}


const GridCard = ({ card }: GridCardProps) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
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

export default Home





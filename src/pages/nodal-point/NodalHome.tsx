import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Colors, Logo } from '../../constants/Colors';
import NodalInstance from '../../services/axiosInstances/axiosNp';
import { useNavigate } from 'react-router-dom';
import nodalCards, { GridCardProps } from '../../constants/CardDatas/NodalCards';
import Header from '../../components/Header';
import { useEffect } from 'react';


const cards = nodalCards

const NodalHome = () => {
    const navigate = useNavigate()


    useEffect(() => {
        NodalInstance.get('/home').then().catch(() => {
            if (localStorage.getItem('nodalToken')) {
                localStorage.removeItem('nodalToken')
            }
            navigate('/nodal/login')
        })
    }, [])


    return (
        <>
            <Header role='nodal' />
            <center className='mt-4' >
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
            </center>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
                <h1 style={{ color: Colors.SecondaryColor, marginTop: '0px', marginBottom: '0px' }}>Nodal Point Dashboard</h1>
            </div>
            <main>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    <Grid container spacing={4}>
                        {cards.map((card, index) => (
                            <GridCard key={index + 100} card={card} />

                        ))}
                    </Grid>
                </Container>
            </main>

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
                    <Typography gutterBottom variant="h5" component="h2" color={Colors.SecondaryColor}>
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


export default NodalHome
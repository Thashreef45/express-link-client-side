import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { Button, CardActions, Grid } from '@mui/material';
import { Colors } from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { AxiosResponse } from 'axios';
import { awbCards } from '../../constants/CardDatas/CpCards';
import Header from '../../components/Header';

const cards = awbCards

export default function PurchaseAwb() {



    const key = localStorage.getItem('cpToken')
    const navigate = useNavigate()

    useEffect(() => {
        CpInstance.get('/home', {
            headers: {
                token: key
            }
        }).then((res: AxiosResponse) => {
            console.log(res.data, 'data from backend')
        }).catch((err) => {
            console.log(err)
            if (key) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);


    return (
        <>
            <Header />
            <main>
                <div style={{ display: 'flex', width: '100vw', alignItems: 'center', justifyContent: 'center', marginTop: '5rem' }}>
                    <h1 style={{color:Colors.SecondaryColor}}>Purchase Consignment</h1>
                </div>
                <Container sx={{ py: 8 }} maxWidth="lg">
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


const GridCard = ({ card, key }: { card: any, key: number }) => {
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
                    <Typography gutterBottom variant="h5" component="h2" color={Colors.SecondaryColor}>
                        {card.name}
                    </Typography>
                </CardContent >

                <CardActions>
                    <a href={card.link}>
                        <Button size="small">Buy</Button></a>
                </CardActions>
            </Card>
        </Grid>
    )
}










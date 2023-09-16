import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { Button, CardActions, Container, Grid } from '@mui/material';
import { Colors } from '../../constants/Colors';
import { AxiosResponse } from 'axios';
import cpCards, { GridCardProps } from '../../constants/CardDatas/CpCards';
import Header from '../../components/Header';

const cards = cpCards

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
        }).catch((err) => {
            console.log(err)
            if (key) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);

    return (
        <>
            <Header role='cp'/>
            <div style={{ display: 'flex', width: '100vw', alignItems: 'center', justifyContent: 'center', marginTop: '3rem' }}>
                    <h2 style={{color:Colors.SecondaryColor,marginTop:'0px',marginBottom:'0px'}}>Channel Partner Dashboard</h2>
            </div>
            <main>
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





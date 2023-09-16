
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CardActions, Container, Grid } from '@mui/material';
import { Colors } from '../../constants/Colors';
import ApextInstance from '../../services/axiosInstances/axiosApex';
import ApexCardData, { GridCardProps } from '../../constants/CardDatas/ApexCard';
import Header from '../../components/Header';
import { width } from '@mui/system';

const cards = ApexCardData


const ApexHome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('apexToken')
        if (!token) navigate('/apex/login')
        else {
            ApextInstance.get('/home', {
                headers: {
                    token
                }
            }).then((res) => {
                console.log(res.data)
            }).catch(() => {
                if (token) localStorage.removeItem('apexToken')
                navigate('/apex/login')
            })
        }

    }, [])

    return (
        <>
            <Header role={'apex'} />

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

export default ApexHome




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





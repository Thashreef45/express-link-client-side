import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Colors } from '../../constants/Colors';
import NodalInstance from '../../services/axiosInstances/axiosNp';
import { useNavigate } from 'react-router-dom';
import nodalCards,{ GridCardProps } from '../../constants/CardDatas/NodalCards';


const cards = nodalCards

const NodalHome = () => {
    const navigate = useNavigate()



    NodalInstance.get('/home', {
        headers: {
            token: localStorage.getItem('nodalToken')
        }
    }).then((res) => {
        console.log(res.data)
    }).catch(() => {
        if (localStorage.getItem('nodalToken')) {
            localStorage.removeItem('nodalToken')
        }
        navigate('/nodal/login')
    })


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

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Colors } from '../../constants/Colors';
import NodalInstance from '../../config/axiosInstances/axiosNp';
import { useNavigate } from 'react-router-dom';

interface GridCardProps {
    card: {
        name: string;
        link: string;
        image: string;
    };
    key: React.Key;
}

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
            <AppBar position="relative">
                <Toolbar>
                    {/* <CameraIcon sx={{ mr: 2 }} /> */}
                    <Button style={{ color: 'white', backgroundColor: 'gray' }}>Logout</Button>
                </Toolbar>
            </AppBar>

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






const cards = [{
    name: "Pincode Search",
    link: "",
    image: '../../public/images/icons8-pin-100.png'
},
{
    name: "Tracking",
    link: "",
    image: "../../public/images/icons8-tracking-100.png"
},
{
    name: "Send FDM",
    link: "",
    image: "../../public/images/icons8-send-64.png"
},
{
    name: "Recieved FDM",
    link: "",
    image: "../../public/images/icons8-import-64.png"
},
{
    name: "Create-CP",
    link: "/nodal/create-cp",
    image: '../../public/images/icons8-add-new-64.png'
},

];








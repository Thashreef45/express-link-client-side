import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container, width } from '@mui/system';
import { Button, CardActions, Grid } from '@mui/material';
import { Colors, Logo } from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { AxiosResponse } from 'axios';
import { awbCards } from '../../constants/CardDatas/CpCards';
import Header from '../../components/Header';
import BuyAwbModal from '../../components/channel-partner/BuyAwbModal';



const cards = awbCards
let consignmentPrefix: string

export default function PurchaseAwb() {


    const key = localStorage.getItem('cpToken')
    const navigate = useNavigate()

    useEffect(() => {
        CpInstance.get('/home').then((res: AxiosResponse) => {
            consignmentPrefix = res.data.consignmentPrefix
        }).catch((err) => {
            console.log(err)
            if (key) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);


    return (
        <>
            <Header role='cp' />
            <main>
                <div style={{ display: 'flex', width: '100vw', alignItems: 'center', justifyContent: 'center', marginTop: '3rem' }}>
                    <center>
                        <img src={Logo.Main}
                            style={{ width: "30%" }} alt="" /> <br /> <br /> <br /> <br />
                        <h1 style={{ color: Colors.SecondaryColor }}>Purchase Consignment</h1>
                    </center>
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

    const [modalShow, setModalShow] = React.useState(false);

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
                    <Button onClick={() => setModalShow(true)}>
                        Buy
                    </Button>

                    <BuyAwbModal
                        name={card.name}
                        cpPrefix={consignmentPrefix}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />

                </CardActions>
            </Card>
        </Grid>
    )
}










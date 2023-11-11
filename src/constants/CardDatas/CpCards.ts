import Barcode from '../Barcode'

const cpCards = [
    {
        name: "Pincode Search",
        link: "/cp/pincode-search",
        image: 'https://res.cloudinary.com/expresslink/image/upload/v1699186315/icons8-pin-100_zcesor.png'
    },
    {
        name: "Tracking",
        link: "/cp/tracking",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186316/icons8-tracking-100_njyefg.png"
    },
    {
        name: "My Booking",
        link: "/cp/my-bookings",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186313/icons8-booking-96_w56aiv.png"
    },
    {
        name: "Delivery Management",
        link: "/cp/delivery-management",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186322/icons8-delivery-96_nzky4y.png"
    },
    {
        name: "Employee Management",
        link: "/cp/employee-management",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186328/icons8-employee-96_usgjgg.png"
    },
    {
        name: "Purchase AWB",
        link: "/cp/purchase-awb",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186313/icons8-awb-96_geb4fa.png"
    },
    {
        name: "New Booking",
        link: "/cp/new-booking",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186313/icons8-new-document-96_tvu2ot.png"
    },
];


const Awbimage = "https://res.cloudinary.com/expresslink/image/upload/v1699186313/icons8-barcode-100_ukqa9p.png"
export const awbCards = [{
    name:"Normal",
    link: "",
    image:Barcode()
},
{
    name: "PR",
    link: "",
    image:Barcode()
},
{
    name: "WE",
    link: "",
    image:Barcode()
},
];


export interface GridCardProps {
    card: {
        name: string;
        link: string;
        image: string;
    };
    key: React.Key;
}


export default cpCards




// export default Barcode;
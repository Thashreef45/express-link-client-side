const cpCards = [
    {
        name: "Pincode Search",
        link: "/cp/pincode-search",
        image: '/src/assets/images/icons8-pin-100.png'
    },
    {
        name: "Tracking",
        link: "/cp/tracking",
        image: "/src/assets/images/icons8-tracking-100.png"
    },
    {
        name: "My Booking",
        link: "/cp/my-bookings",
        image: "/src/assets/images/icons8-booking-96.png"
    },
    {
        name: "Recieved-FDM",
        link: "/cp/recieved-fdms",
        image: "/src/assets/images/"
    },
    {
        name: "Delivery Management",
        link: "/cp/delivery-management",
        image: "/src/assets/images/icons8-delivery-96.png"
    },
    {
        name: "Employee Management",
        link: "/cp/employee-management",
        image: "/src/assets/images/icons8-employee-96.png"
    },
    {
        name: "Purchase AWB",
        link: "/cp/purchase-awb",
        image: "/src/assets/images/icons8-awb-96.png"
    },
    {
        name: "New Booking",
        link: "/cp/new-booking",
        image: "/src/assets/images/icons8-new-document-96.png"
    },
];


const Awbimage = "/src/assets/images/icons8-barcode-100.png"
export const awbCards = [{
    name:"Normal",
    link: "",
    image:Awbimage
},
{
    name: "PR",
    link: "",
    image:Awbimage
},
{
    name: "WE",
    link: "",
    image:Awbimage
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
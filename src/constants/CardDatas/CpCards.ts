const cpCards = [
    {
        name: "Pincode Search",
        link: "/cp/pincode-search",
        image: '/src/assets/images/icons8-pin-100.png'
    },
    {
        name: "Tracking",
        link: "",
        image: "/src/assets/images/icons8-tracking-100.png"
    },
    {
        name: "My Booking",
        link: "",
        image: "/src/assets/images/icons8-booking-96.png"
    },
    {
        name: "My Delivery",
        link: "",
        image: "/src/assets/images/icons8-delivery-96.png"
    },
    {
        name: "Employee Management",
        link: "",
        image: "/src/assets/images/icons8-employee-96.png"
    },
    {
        name: "Purchase AWB",
        link: "/cp/purchase-awb",
        image: "/src/assets/images/icons8-awb-96.png"
    },
];


export const awbCards = [{
    name:"Normal",
    link: "",
    image: '/src/assets/images/icons8-pin-100.png'
},
{
    name: "PR",
    link: "",
    image: "/src/assets/images/icons8-tracking-100.png"
},
{
    name: "WE",
    link: "",
    image: "/src/assets/images/icons8-tracking-100.png"
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
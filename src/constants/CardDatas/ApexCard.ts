
const ApexCardData = [
    {
        name: "Create Nodal",
        link: "/apex/create-nodal",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186313/icons8-add-new-64_cpltu8.png"
    },
    {
        name: "Pincode Search",
        link: "/apex/pincode-search",
        image: 'https://res.cloudinary.com/expresslink/image/upload/v1699186315/icons8-pin-100_zcesor.png'
    },
    {
        name: "Tracking",
        link: "/apex/tracking",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186316/icons8-tracking-100_njyefg.png"
    },
    {
        name: "Out Goings",
        link: "/apex/out-goings",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186315/icons8-send-64_qawopc.png"
    },
    {
        name: "Incomings",
        link: "/apex/incomings",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186314/icons8-import-64_vhkfl5.png"
    },
    // {
    //     name: "Employee Management",
    //     link: "",
    //     image: "/src/assets/images/icons8-booking-96.png"
    // },

];

export interface GridCardProps {
    card: {
        name: string;
        link: string;
        image: string;
    };
    key: React.Key;
}

export default ApexCardData 
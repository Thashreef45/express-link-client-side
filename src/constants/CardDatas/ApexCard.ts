
const ApexCardData = [
    {
        name: "Create Nodal",
        link: "/apex/create-nodal",
        image: "/src/assets/images/icons8-add-new-64.png"
    },
    {
        name: "Pincode Search",
        link: "",
        image: '/src/assets/images/icons8-pin-100.png'
    },
    {
        name: "Tracking",
        link: "",
        image: "/src/assets/images/icons8-tracking-100.png"
    },
    {
        name: "Out Goings",
        link: "/apex/out-goings",
        image: "/src/assets/images/icons8-send-64.png"
    },
    {
        name: "Incomings",
        link: "",
        image: "/src/assets/images/icons8-import-64.png"
    },
    {
        name: "Employee Management",
        link: "",
        image: "/src/assets/images/icons8-booking-96.png"
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

export default ApexCardData 
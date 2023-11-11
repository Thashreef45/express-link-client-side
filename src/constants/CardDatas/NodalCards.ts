const nodalCards = [
    {
        name: "Pincode Search",
        link: "/nodal/pincode-search",
        image: 'https://res.cloudinary.com/expresslink/image/upload/v1699186315/icons8-pin-100_zcesor.png'
    },
    {
        name: "Tracking",
        link: "/nodal/tracking",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186316/icons8-tracking-100_njyefg.png"
    },
    {
        name: "Send FDM",
        link: "/nodal/send-fdms",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186315/icons8-send-64_qawopc.png"
    },
    {
        name: "Recieved FDM",
        link: "/nodal/recieved-fdms",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699186314/icons8-import-64_vhkfl5.png"
    },
    {
        name: "Create-CP",
        link: "/nodal/create-cp",
        image: 'https://res.cloudinary.com/expresslink/image/upload/v1699186313/icons8-add-new-64_cpltu8.png'
    },
    {
        name: "Return Management",
        link: "/nodal/return-sending",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699700094/icons8-previous-location-100_qza3ck.png"
    },
    {
        name: "Accept FDM",
        link: "/nodal/accept-fdm",
        image: "https://res.cloudinary.com/expresslink/image/upload/v1699700600/icons8-accept-64_od2mga.png"
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

export default nodalCards


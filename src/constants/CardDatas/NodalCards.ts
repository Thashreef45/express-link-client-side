const nodalCards = [
    {
        name: "Pincode Search",
        link: "/nodal/pincode-search",
        image: '/src/assets/images/icons8-pin-100.png'
    },
    {
        name: "Tracking",
        link: "/nodal/tracking",
        image: "/src/assets/images/icons8-tracking-100.png"
    },
    {
        name: "Send FDM",
        link: "/nodal/send-fdms",
        image: "/src/assets/images/icons8-send-64.png"
    },
    {
        name: "Recieved FDM",
        link: "/nodal/recieved-fdms",
        image: "/src/assets/images/icons8-import-64.png"
    },
    {
        name: "Create-CP",
        link: "/nodal/create-cp",
        image: '/src/assets/images/icons8-add-new-64.png'
    },
    {
        name: "Return Management",
        link: "/nodal/return-sending",
        image: ""
    },
    {
        name: "Accept FDM",
        link: "/nodal/accept-fdm",
        image: ""
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


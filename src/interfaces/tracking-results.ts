interface TrackingResponse {
    image: string,
    awbPrefix: string,
    awb: number,
    originAddress: string,
    address: string,
    originPin: number,
    destinationPin: number,
    contentType: string,
    declaredValue: number,
    bookingTime: string,
    mobile: number,
    status: string,
    drs: string,
    isReturned: boolean,
    sending: TrackSendingPart,
    recieving: TrackRecievingPart,
    notDelivered: {
        sending: TrackSendingPart,
        recieving: TrackRecievingPart,
    },
}

interface Office {
    Date: string,
    address: string
    name: string
}

interface TrackSendingPart {
    nodalRecieved: Office,
    nodalSend: string,
    apexRecieved: Office,
    apexSend: string,
}

interface TrackRecievingPart {
    apexRecieved: Office,
    apexSend: string,
    nodalRecieved: Office,
    nodalSend: string,
    cpRecieved: Office,
    cpUpdate: string,
}


export default TrackingResponse
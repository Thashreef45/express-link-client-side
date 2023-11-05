export interface BookingData {
    awb : string,
    image : string,
    mobile : number,
    originPin : number,
    pincode : number,
    isDoc : boolean,
    originAddress : string,
    declaredValue : number,
    isSameNodal : boolean,
    isSameApex : boolean,
    contentType : string,
    address : string
}

export interface CPData {
    id : string,
    name : string,
    phone : number ,
    email : string,
    address : string | null,
    status : number ,
    consignmentPrefix : string | null,
    pincode : number,
    nodalPoint : string | null,
}





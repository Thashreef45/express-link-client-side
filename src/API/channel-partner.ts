enum CP_API {
    login = '/login',
    home = '/home',
    get_consignment_types = '/get-consignment-types',
    validate_awb = '/validate-awb',
    search_by_pincode = '/search-by-pincode',
    new_booking = '/new-booking',
    get_employees = '/get-employees',
    tracking = '/tracking',
    get_booking_history = '/get-booking-history',
    get_my_bookings = '/get-my-bookings',//by pincode
    get_recieved_fdm = '/get-recieved-fdm',
    get_employee = '/employee',//by id
    assigned_fdms = '/assigned-fdms',//assigned fdm for a employee
    create_employee = '/create-employee',
    assign_fdm = '/assign-fdm',
    buy_awb = '/buy-awb',
    delete_booking = '/delete-booking',
    delivery_status = '/delivery-status',
    update_delivery_status = '/update-delivery-status'
  
}

export default CP_API
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
    get_recieved_fdm = 'get-recieved-fdm',
    get_employee = '/employee',//by id
    assigned_fdms = '/assigned-fdms',//assigned fdm for a employee
}

export default CP_API
import Product from "../models/product";

const PRODUCTS = [
    new Product(
        'Precimould-1',
        'PM-50S',
        'https://images.app.goo.gl/VUUAsev2Gy4F2PDs8',
        {'Clamping Force' : '500 KN', 'Machine Weight' : '2 ton'},
        500000,
    ),
    new Product(
        'Precimould-2',
        'PM-100S',
        'https://images.app.goo.gl/VUUAsev2Gy4F2PDs8',
        {'Clamping Force' : '980 KN', 'Machine Weight' : '3.5 ton'},
        750000,
    ),
    new Product(
        'Precimould-3',
        'PM-180S',
        'https://images.app.goo.gl/VUUAsev2Gy4F2PDs8',
        {'Clamping Force' : '1780 KN', 'Machine Weight' : '5.6 ton'},
        1000000,
    ),
    new Product(
        'Preciwire-1',
        'FH-260C',
        'https://images.app.goo.gl/VUUAsev2Gy4F2PDs8',
        {'Load Table' : '250 Kg', 'Rated Power' : '3 KVA'},
        100000,
    ),
    new Product(
        'Preciwire-2',
        'FR-400G',
        'https://images.app.goo.gl/VUUAsev2Gy4F2PDs8',
        {'Load Table' : '350 Kg', 'Rated Power' : '3 KVA'},
        250000,
    ),
]
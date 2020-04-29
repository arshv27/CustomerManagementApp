import Product from "../models/product";

const PRODUCTS = [
    new Product(
        'Precimould-1',
        'PM-50S',
        '../../data/images/Precimould.png',
        {'Clamping Force' : '500 KN', 'Machine Weight' : '2 ton'},
        500000,
    ),
    new Product(
        'Precimould-2',
        'PM-100S',
        '../../data/images/Precimould.png',
        {'Clamping Force' : '980 KN', 'Machine Weight' : '3.5 ton'},
        750000,
    ),
    new Product(
        'Precimould-3',
        'PM-180S',
        '../../data/images/Precimould.png',
        {'Clamping Force' : '1780 KN', 'Machine Weight' : '5.6 ton'},
        1000000,
    ),
    new Product(
        'Preciwire-1',
        'FH-260C',
        '../../data/images/Precimould.png',
        {'Load Table' : '250 Kg', 'Rated Power' : '3 KVA'},
        100000,
    ),
    new Product(
        'Preciwire-2',
        'FR-400G',
        '../../data/images/Precimould.png',
        {'Load Table' : '350 Kg', 'Rated Power' : '3 KVA'},
        250000,
    ),
];

export default PRODUCTS;
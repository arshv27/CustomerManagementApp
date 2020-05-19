const PRODUCTS = [
    {
        id: 'Precimould-1',
        title: 'PM-50S',
        imageAdd: require('./images/Precimould.png'),
        description: {'Clamping Force': '500 KN', 'Machine Weight': '2 ton'},
        base_price: 500000,
    },
    {
        id: 'Precimould-2',
        title: 'PM-100S',
        imageAdd: require('./images/Preciwire_4.png'),
        description: {'Clamping Force': '980 KN', 'Machine Weight': '3.5 ton'},
        base_price: 750000,
    },
    {
        id: 'Precimould-3',
        title: 'PM-180S',
        imageAdd: require('./images/Preciwire_3.png'),
        description: {'Clamping Force': '1780 KN', 'Machine Weight': '5.6 ton'},
        base_price: 1000000,
    },
    {
        id: 'Preciwire-1',
        title: 'FH-260C',
        imageAdd: require('./images/Preciwire_1.png'),
        description: {'Load Table': '250 Kg', 'Rated Power': '3 KVA'},
        base_price: 100000,
    },
    {
        id: 'Preciwire-2',
        title: 'FR-400G',
        description: {'Load Table': '350 Kg', 'Rated Power': '3 KVA'},
        imageAdd: require('./images/Preciwire_2.png'),
        base_price: 250000,
    },
];

export default PRODUCTS;
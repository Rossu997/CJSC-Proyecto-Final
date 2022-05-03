/**
 * DESAFÍO PRINCIPAL 2 
 * Juan Manuel Russo
 * Curso JS CODER - 06/04/2022
*/

//! Data Base


const dataBase = [
    {
        'id': 1,
        'imagenURL': 'https://valenziana.com/wp-content/uploads/2021/07/salta-nat-urb-scaled.jpg',
        'nombre': 'Silla para sentarse',
        'descripcion': 'Es una silla bastante bonita, hecha de madera y tela. Se puede usar para sentarse, pero principalmente se es para dejar colgada la ropa sucia.',
        'precio': 100,
    },
    {
        'id': 2,
        'imagenURL': 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/169/255/products/extensible-en-paraiso1-9e5f829de76f66392415901694469375-1024-1024.jpg',
        'nombre': 'Mesa para apoyar',
        'descripcion': 'Una mesa de madera. Contundente.',
        'precio': 200,
    },
    {
        'id': 3,
        'imagenURL': 'https://tiempos-modernos.com/files/2017/10/110_artisan_cama_fin_madera_01.jpg',
        'nombre': 'Cama para dormir',
        'descripcion': 'Hecha a mano en pinotea y laurel, detalles tallados a mano y protección de la madera con laca poliuretánica semi-mate.',
        'precio': 500,
    },
    {
        'id': 4,
        'imagenURL': 'https://tiempos-modernos.com/files/2017/10/110_artisan_cama_fin_madera_01.jpg',
        'nombre': 'PRUEBITA',
        'descripcion': 'Hecha a mano en pinotea y laurel, detalles tallados a mano y protección de la madera con laca poliuretánica semi-mate.',
        'precio': 800,
    },
];

localStorage.setItem('articulos', JSON.stringify(dataBase));

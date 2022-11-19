import avatar01 from './jpg/avatar-01.jpg';
import avatar02 from './jpg/avatar-02.jpg';
import avatar03 from './jpg/avatar-03.jpg';
import avatar04 from './jpg/avatar-04.jpg';
import avatar05 from './jpg/avatar-05.jpg';
import avatar06 from './jpg/avatar-06.jpg';
import avatar07 from './jpg/avatar-07.jpg';
import avatar08 from './jpg/avatar-08.jpg';
import avatar09 from './jpg/avatar-09.jpg';
import avatar10 from './jpg/avatar-10.jpg';

export const URL_BASE = 'https://content.guardianapis.com/';
export const URL_SEARCH = '/search';
export const URL_SECTIONS = '/sections';
export const URL_TAGS = '/tags';

export const QUERY = 'q';
export const TAG = 'tag';
export const FROM_DATE = 'from-date';

export const API_KEY = 'api-key';
export const API_KEY_NUMBER = 'bc1ad419-c748-4289-be70-bc5e1bf855f7';

export const SEARCH_DEFAULT = 'news';

export const TEST_URL = `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&${API_KEY}${API_KEY_NUMBER}`

// date format: yyyy-mm-dd
export const TEST_SEARCH_DATA = {
    'query': '"nasa artemis"', 
    'tag': 'politics', 
    'from-date': '2022-01-30',
};

export const PAGE_TITLE = 'The Guardian Browser';

export const TEST_MAIN_CATEGORIES = [
    'News',
    'Opinion',
    'Sport',
    'Culture',
    'Lifestyle',
];

// export const TEST_CATEGORIES = [
//     {
//         maincategory: 'News',
//         subcategories: [
//             'World news',
//             'UK news',
//             'Coronavirus',
//             'Climate crisis',
//             'Environment',
//             'Science',
//             'Global development',
//             'Football',
//             'Tech',
//             'Business',
//             'Obituaries',
//         ],
//     },
//     {
//         maincategory: 'Opinion',
//         subcategories: [
//             'The Guardian view',
//             'Columnists',
//             'Cartoons',
//             'Opinion videos',
//             'Letters',
//         ],
//     },
//     {
//         maincategory: 'Sport',
//         subcategories: [
//             'Football',
//             'Cricket',
//             'Rugby union',
//             'Tennis',
//             'Cycling',
//             'F1',
//             'Golf',
//             'US sports',
//         ],
//     },
//     {
//         maincategory: 'Culture',
//         subcategories: [
//             'Music',
//             'Books',
//             'TV & radio',
//             'Art & design',
//             'Film',
//             'Games',
//             'Classical',
//             'Stage',
//         ],
//     },
//     {
//         maincategory: 'Lifestyle',
//         subcategories: [
//             'Fashion',
//             'Food',
//             'Recipes',
//             'Love & sex',
//             'Health & fitness',
//             'Home & garden',
//             'Women',
//             'Men',
//             'Family',
//             'Travel',
//             'Money',
//         ],
//     },
// ];

export const TEST_AUTHORS_BASE = [
    {
        name: 'Edward Newgate',
        avatar: avatar01 
    },
    {
        name: 'Alisa Bosii',
        avatar: avatar02 
    },
    {
        name: 'Thomas Mazer',
        avatar: avatar03 
    },
    {
        name: 'Anastasia Bergsen',
        avatar: avatar04 
    },  
]

export function getAuthors() {
    const authorsList = TEST_AUTHORS_BASE;
    return Array.from(new Array(10).fill(null), () => authorsList[Math.floor(Math.random() * 4)])
}

// export const TEST_AUTHORS = [
//     {
//         name: 'Edward Newgate',
//         avatar: avatar01 
//     },
//     {
//         name: 'Alisa Mazer',
//         avatar: avatar02 
//     },
//     {
//         name: 'Thomas Bergsen',
//         avatar: avatar03 
//     },
//     {
//         name: 'Anastasia Bosii',
//         avatar: avatar04 
//     },
//     {
//         name: 'Edward Newgate',
//         avatar: avatar05 
//     },
//     {
//         name: 'Alisa Mazer',
//         avatar: avatar06 
//     },
//     {
//         name: 'Thomas Bergsen',
//         avatar: avatar07 
//     },
//     {
//         name: 'Anastasia Bosii',
//         avatar: avatar08 
//     },
//     {
//         name: 'Edward Newgate',
//         avatar: avatar09 
//     },
//     {
//         name: 'Alisa Mazer',
//         avatar: avatar10 
//     },
// ];

const TEST_CARD_TITLE = 'Test Article Title';
const TEST_CARD_DATE_EU = '24/10/2022';
const TEST_CARD_TAG = 'politics';
const TEST_CARD_TEXT = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea suscipit fuga quisquam eos, quaerat non at eum eius quia ut deserunt sed, aliquid qui explicabo totam nulla velit modi vitae.'

const TEST_CARD_DATA = {
    title: TEST_CARD_TITLE,
    date: TEST_CARD_DATE_EU,
    tag: TEST_CARD_TAG,
    text: TEST_CARD_TEXT,
    // author: TEST_AUTHORS[0], 
}

export const TEST_CARD_DATA_LIST = [
    TEST_CARD_DATA, 
    TEST_CARD_DATA, 
    TEST_CARD_DATA,
    TEST_CARD_DATA, 
    TEST_CARD_DATA, 
    TEST_CARD_DATA,
    TEST_CARD_DATA, 
    TEST_CARD_DATA, 
    TEST_CARD_DATA,
    TEST_CARD_DATA, 
];


export const TEST_PAGES_ALL = 511;
export const TEST_PAGES_CURRENT = 51;
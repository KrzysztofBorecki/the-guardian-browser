import avatar01 from './assets/avatars/avatar-01-philip-martin-unsplash.jpg';
import avatar02 from './assets/avatars/avatar-02-jonathan-borba-unsplash.jpg';
import avatar03 from './assets/avatars/avatar-03-gelmis-bartulis-unsplash.jpg';
import avatar04 from './assets/avatars/avatar-04-michael-dam-unsplash.jpg';
import avatar05 from './assets/avatars/avatar-05-andrey-zvyagintsev-unsplash.jpg';
import avatar06 from './assets/avatars/avatar-06-rachel-mcdermott-unsplash.jpg';
import avatar07 from './assets/avatars/avatar-07-d-a-v-i-d-s-o-n-l-u-n-a-unsplash.jpg';
import avatar08 from './assets/avatars/avatar-08-jonathan-cosens-photography-unsplash.jpg';
import avatar09 from './assets/avatars/avatar-09-christina-wocintechchat-com-unsplash.jpg';
import avatar010 from './assets/avatars/avatar-10-linkedin-sales-solutions-unsplash.jpg';

export const PAGE_TITLE = 'The Guardian Browser';

export const URL_BASE = 'https://content.guardianapis.com/';
export const URL_SEARCH = '/search';
export const URL_SECTIONS = '/sections';

export const QUERY = 'q';
export const PAGE = 'page';

export const API_KEY = 'api-key';
export const API_KEY_NUMBER = 'bc1ad419-c748-4289-be70-bc5e1bf855f7';

export const SEARCH_PHRASE_DEFAULT = '';
export const PAGE_NUMBER_DEFAULT = '1';

export const AUTHORS_BASE = [
    {
        name: 'Edward Newgate',
        avatar: avatar01,
    },
    {
        name: 'Alisa Bosii',
        avatar: avatar02,
    },
    {
        name: 'Thomas Mazer',
        avatar: avatar03,
    },
    {
        name: 'Anastasia Dumitru',
        avatar: avatar04,
    },
    {
        name: 'Astrid Giraud',
        avatar: avatar05,
    },
    {
        name: 'Katrijn Rey',
        avatar: avatar06,
    },
    {
        name: 'Joakim Arnaud',
        avatar: avatar07,
    },
    {
        name: 'Léon Guillot',
        avatar: avatar08,
    },
    {
        name: 'Marion Salina',
        avatar: avatar09,
    },
    {
        name: 'Gustav Filipek',
        avatar: avatar010,
    },
]

// generates authors for 10 avatars
export function getAuthors() {
    const authorsList = AUTHORS_BASE;
    return Array.from(new Array(10).fill(null), () => authorsList[Math.floor(Math.random() * 10)])
}

const LOREM_50 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, sunt repellat voluptatibus a dignissimos dolor esse. Voluptas, hic delectus corrupti quibusdam quis deleniti odio quas dolores, beatae iure perspiciatis perferendis voluptatem necessitatibus minus maiores nihil eveniet. Veritatis, aut iste minima suscipit atque assumenda ducimus pariatur minus quidem recusandae, accusantium aliquid.'

const LOREM50_LIST = LOREM_50.split(' ');

//_generates text of lorem ipsum
function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomLorem(min: number, max: number) {
    const randomEndNumber = getRandomNumber(min, max);
    const loremSliced = LOREM50_LIST.slice(0, randomEndNumber);
    const loremJoined = loremSliced.join(' ');
    const loremLenght = loremJoined.length - 1;
    
    return (
        ((loremJoined[loremLenght].includes(',')) || loremJoined[loremLenght].includes('.')) ? 
        loremJoined.slice(0, loremLenght) + '.' :
        loremJoined + '.'
    );
}

/* export const TEST_MAIN_CATEGORIES = [
    'News',
    'Opinion',
    'Sport',
    'Culture',
    'Lifestyle',
]; */

/* export const TEST_CATEGORIES = [
    {
        maincategory: 'News',
        subcategories: [
            'World news',
            'UK news',
            'Coronavirus',
            'Climate crisis',
            'Environment',
            'Science',
            'Global development',
            'Football',
            'Tech',
            'Business',
            'Obituaries',
        ],
    },
    {
        maincategory: 'Opinion',
        subcategories: [
            'The Guardian view',
            'Columnists',
            'Cartoons',
            'Opinion videos',
            'Letters',
        ],
    },
    {
        maincategory: 'Sport',
        subcategories: [
            'Football',
            'Cricket',
            'Rugby union',
            'Tennis',
            'Cycling',
            'F1',
            'Golf',
            'US sports',
        ],
    },
    {
        maincategory: 'Culture',
        subcategories: [
            'Music',
            'Books',
            'TV & radio',
            'Art & design',
            'Film',
            'Games',
            'Classical',
            'Stage',
        ],
    },
    {
        maincategory: 'Lifestyle',
        subcategories: [
            'Fashion',
            'Food',
            'Recipes',
            'Love & sex',
            'Health & fitness',
            'Home & garden',
            'Women',
            'Men',
            'Family',
            'Travel',
            'Money',
        ],
    },
]; */

// const TEST_CARD_TITLE = 'Test Article Title';
// const TEST_CARD_DATE_EU = '24/10/2022';
// const TEST_CARD_TAG = 'politics';
// const TEST_CARD_TEXT = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea suscipit fuga quisquam eos, quaerat non at eum eius quia ut deserunt sed, aliquid qui explicabo totam nulla velit modi vitae.'
// const TEST_CARD_URL = 'https://www.google.com'

/* const TEST_CARD_DATA = {
    title: TEST_CARD_TITLE,
    date: TEST_CARD_DATE_EU,
    tag: TEST_CARD_TAG,
    text: TEST_CARD_TEXT,
    url: TEST_CARD_URL,
    // author: TEST_AUTHORS[0],
} */

/* export const TEST_CARD_DATA_LIST = [
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
]; */

// export const TEST_PAGES_ALL = 511;
// export const TEST_PAGES_CURRENT = 51;

// export const TEST_URL = `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&${API_KEY}${API_KEY_NUMBER}`;
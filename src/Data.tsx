export const URL_BASE = 'https://content.guardianapis.com/';
export const URL_SEARCH = '/search';
export const URL_TAGS = '/tags';

export const QUERY = 'q';
export const TAG = 'tag';
export const FROM_DATE = 'from-date';

export const API_KEY = 'api-key';
export const API_KEY_NUMBER = 'bc1ad419-c748-4289-be70-bc5e1bf855f7';

export const TEST_URL = `https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01&${API_KEY}${API_KEY_NUMBER}`

// date format: yyyy-mm-dd
export const TEST_SEARCH_DATA = {
    'query': '"elon musk"', 
    'tag': 'politics', 
    'from-date': '2022-01-30',
};

export const PAGE_TITLE = 'The Guardian Browser';

const TEST_CARD_TITLE = 'Test Article Title';
const TEST_CARD_DATE_EU = '24/10/2022';
const TEST_CARD_TAG = 'politics';
const TEST_CARD_TEXT = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea suscipit fuga quisquam eos, quaerat non at eum eius quia ut deserunt sed, aliquid qui explicabo totam nulla velit modi vitae.'

const TEST_CARD_DATA = {
    title: TEST_CARD_TITLE,
    date: TEST_CARD_DATE_EU,
    tag: TEST_CARD_TAG,
    text: TEST_CARD_TEXT,
}

export const TEST_CARD_DATA_LIST = [
    TEST_CARD_DATA, 
    TEST_CARD_DATA, 
    TEST_CARD_DATA
];

export const TEST_MAIN_CATEGORIES = [
    'News',
    'Opinion',
    'Sport',
    'Culture',
    'Lifestyle',
];

export const TEST_CATEGORIES = [
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
];


export const TEST_PAGES_ALL = 511;
export const TEST_PAGES_CURRENT = 51; 
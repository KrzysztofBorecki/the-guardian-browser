import avatar01 from '../assets/avatars/avatar-01-philip-martin-unsplash.jpg';
import avatar02 from '../assets/avatars/avatar-02-jonathan-borba-unsplash.jpg';
import avatar03 from '../assets/avatars/avatar-03-gelmis-bartulis-unsplash.jpg';
import avatar04 from '../assets/avatars/avatar-04-michael-dam-unsplash.jpg';
import avatar05 from '../assets/avatars/avatar-05-andrey-zvyagintsev-unsplash.jpg';
import avatar06 from '../assets/avatars/avatar-06-rachel-mcdermott-unsplash.jpg';
import avatar07 from '../assets/avatars/avatar-07-d-a-v-i-d-s-o-n-l-u-n-a-unsplash.jpg';
import avatar08 from '../assets/avatars/avatar-08-jonathan-cosens-photography-unsplash.jpg';
import avatar09 from '../assets/avatars/avatar-09-christina-wocintechchat-com-unsplash.jpg';
import avatar010 from '../assets/avatars/avatar-10-linkedin-sales-solutions-unsplash.jpg';
import { getRandomNumber } from './random';
import type { IAuthor } from '../types/types';

const AUTHORS_BASE = [
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
];

export function getRandomAuthor(): IAuthor {
    const number = getRandomNumber(1, 10);

    return AUTHORS_BASE[number];
}
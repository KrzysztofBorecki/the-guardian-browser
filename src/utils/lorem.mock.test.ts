import { getRandomLorem } from './lorem.mock';

describe('utils/lorem.mock', () => {
    test('getRandomLorem returns string of 10 words', () => {
        expect(getRandomLorem(10).split(' ')).toHaveLength(10);
    });
});
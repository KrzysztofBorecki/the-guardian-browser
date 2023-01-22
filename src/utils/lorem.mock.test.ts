import { getRandomLorem } from './lorem.mock';

describe(`lorem.mock`, () => {
    describe(`call getRandomLorem(10)`, () => {
        it(`should return string of 10 words`, () => {
            expect(getRandomLorem(10).split(' ')).toHaveLength(10);
        });

        it(`should return string starting with capitalized first letter`, () => {
            const value = getRandomLorem(10);

            expect(value.charAt(0)).toEqual(value.charAt(0).toUpperCase());
        });

        it(`should return string ending with "."`, () => {
            const value = getRandomLorem(10);

            expect(value.charAt(value.length - 1)).toEqual('.');
        });
    });
});
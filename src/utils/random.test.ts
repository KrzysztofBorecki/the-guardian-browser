import { getRandomNumber } from './random';

describe(`random`, () => {
    describe(`call getRandomNumber(1, 10)`, () => {
        it(`should return number >= 1`, () => {
            expect(getRandomNumber(1, 10)).toBeGreaterThanOrEqual(1);
        });

        it(`should return number <= 10`, () => {
            expect(getRandomNumber(1, 10)).toBeLessThanOrEqual(10);
        });
    });
});
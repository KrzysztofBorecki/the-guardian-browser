import { getRandomNumber } from './random';

describe(`getRandomNumber`, () => {
    describe(`when called with arguments (1, 10)`, () => {
        it(`should return number >= 1`, () => {
            expect(getRandomNumber(1, 10)).toBeGreaterThanOrEqual(1);
        });

        it(`should return number <= 10`, () => {
            expect(getRandomNumber(1, 10)).toBeLessThanOrEqual(10);
        });
    });
});
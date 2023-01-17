import { getRandomNumber } from './random';

describe('utils/random', () => {
    test('getRandomNumber returns number >= 1', () => {
        expect(getRandomNumber(1, 10)).toBeGreaterThanOrEqual(1);
    });

    test('getRandomNumber returns number <= 10', () => {
        expect(getRandomNumber(1, 10)).toBeLessThanOrEqual(10);
    });
});
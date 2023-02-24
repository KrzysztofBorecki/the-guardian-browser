import { getParsedDate } from './dates';

describe(`getParsedDate`, () => {
    describe(`when called with string represention of the date and time`, () => {
        it(`should return parsed date in format "dd MMM yyyy"`, () => {
            expect(getParsedDate(new Date('2023-01-01').toString())).toEqual('01 Jan 2023');
        });
    });
});
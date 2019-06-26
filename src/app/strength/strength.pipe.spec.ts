import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
    it('should display weak if strength is 5', () => {
        //arrange
        let pipe = new StrengthPipe();

        //act
        let value = pipe.transform(5);

        //arrange
        expect(value).toEqual('5 (weak)');
    });

    it('should display strong if strength is 10', () => {
        //arrange
        let pipe = new StrengthPipe();

        //act
        let value = pipe.transform(10);

        //arrange
        expect(value).toEqual('10 (strong)');
    });
});
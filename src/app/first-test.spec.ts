describe('my first test', () => {
    let sut; //System under test

    //this will reset the state that way we make sure that we don't pollute our variables with the 
    //execution of the tests. 
    beforeEach(() => {
        sut = {};
    });

    //It is a good practice to  start the tests with "should" because the prompt concatenates
    //the name of the describe parameter with this one so in the results will appear: 
    // "my first test should be true if true" [Failed | Passed]
    it('should be true if true', () => {
        //arrange
        sut.a = false;

        //act
        sut.a = true;

        //assert
        expect(sut.a).toBe(true);
    });
});
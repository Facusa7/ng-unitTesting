import { MessageService } from "./message.service";

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        service = new MessageService(); //We could move this to the arrange part of every test, it is DRY vs DAMP
    });

    it('should have no messages to start', () => {

        //act
        let value = service.messages.length;

        //assert
        expect(value).toBe(0);
    });

    it('should add a message when add is called', () => {

        //act
        service.add('Message1');
        let value = service.messages.length;

        //assert
        expect(value).toBe(1);
    });

    it('should remove all messages when clear is called', () => {
        //arrange
        service.add('Message1');

        //act
        service.clear();
        let value = service.messages.length;

        //assert
        expect(value).toBe(0);
    });
})
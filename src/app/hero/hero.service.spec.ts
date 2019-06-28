import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service; 

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ 
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });
        //it gets an instance of a service inside of a testing module
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    });

    //with the inject testing method we can call whatever service we need and use it in the test. 
    // it('should call get with the correct URL', 
    //     inject([
    //         HeroService, 
    //         HttpTestingController
    //     ],
    //     (
    //         service: HeroService, 
    //         controller: HttpTestingController
    //     ) => {
    //         service.getHero(4).subscribe();
    //     }
    // ));
    it('should call get with the correct URL', () => {

        //act
        service.getHero(4).subscribe();

        //assert
        const req = httpTestingController.expectOne('api/heroes/4'); //Expects one matching request
        req.flush({id: 4, name: 'SuperDude', strength: 100});
    });

});
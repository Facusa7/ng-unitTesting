import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";

describe('HeroComponent (shallow tests)', () => {
    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {

        HEROES = [
            {id:1, name:'Spider', strength: 8},
            {id:2, name:'Woman', strength: 24},
            {id:33, name:'Hulk', strength: 55},
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: HeroService, useValue: mockHeroService }//When someone ask for a HeroService, give it the mock      
            ]       
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service', () => {
        //arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //act
        fixture.detectChanges(); //This fire lifecycles event to run, Ex. ngOnInit.

        //assert
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });
});
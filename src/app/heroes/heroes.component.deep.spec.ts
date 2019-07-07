import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('HeroComponent (deep tests)', () => {
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
            declarations: [HeroesComponent, HeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }//When someone ask for a HeroService, give it the mock      
            ],
            schemas: [NO_ERRORS_SCHEMA]       
        });

        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();//Force the lifecycle for parent and children components
    });

    it('should render each hero as a HeroComponent', () => {
        
        //act
        //This will find all the directives bound to the hero component
        //because in fact, a component is a subclass of a directive. 
        //DE = Debug Elements
        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        //assert
        expect(heroComponentsDEs.length).toEqual(3);
        
        for (let index = 0; index < heroComponentsDEs.length; index++) {
            expect(heroComponentsDEs[index].componentInstance.hero).toEqual(HEROES[index]);            
        }
    });

    it(`should call the heroService.deleteHero when the Hero component's delete button is clicked`, () =>{
       
        //Arrange
        //Here we tell jasmine to 'watch' the delete method inside the component
        spyOn(fixture.componentInstance, 'delete');

        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        //Act
        //triggerEventHandler receives two parameters: the name of the method and the object that come along with that event.
        //We create the stopPropagation as a dummy method because that is what is happening inside the component.
        heroComponentsDEs[0].query(By.css('button'))
            .triggerEventHandler('click', { stopPropagation: () => {}});

        //Assert
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        
    });
});
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { by } from "protractor";


@Directive({
    selector: '[routerLink]',
    //listen to the click event on the parent DOM node,
    //and when that event is fired, call my onClick method.
    host: { '(click)': 'onClick()'} 
})
export class RouterLinkDirectiveStub {
    //same name as the selector
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

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
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                { provide: HeroService, useValue: mockHeroService }//When someone ask for a HeroService, give it the mock      
            ],
            // schemas: [NO_ERRORS_SCHEMA]       
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
        // heroComponentsDEs[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => {}});

        //this way we emit the event instead of forcing the click
        //(<HeroComponent>heroComponentsDEs[0].componentInstance).delete.emit(undefined);

        //but in order to test less, and only the boundaries between the two components we can trigger the delete event of the child one.
        heroComponentsDEs[0].triggerEventHandler('delete', null);

        //Assert
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        
    });

    it('should add a new hero to the hero list when the add button is clicked', ()=>{
        //Arrange
        const name = "Mr. Frio";
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 5}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0]; //We already know that the first button is the 'add' one.

        //act
        inputElement.value = name; //inputElement is the actual DOM element
        addButton.triggerEventHandler('click', null); // click 'add' and null as event object.
        fixture.detectChanges(); //to force the execution of the bindings.

        //Assert
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent; //here we get all the strings concatenated. 
        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        //arrange
        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        //this is giving us the debug element for the anchor tag that has the router link on it.
        let routerLink = heroComponentsDEs[0]
        .query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub); //this returns the class of the diretive for the specific component I called.

        //act
        heroComponentsDEs[0].query(By.css('a')).triggerEventHandler('click', null);

        //assert
        expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});
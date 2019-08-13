import { TestBed, ComponentFixture, fakeAsync, tick, flush } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common'; //Make sure that we use Location from the angular dependency injector and not the object from the browser.
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { async } from "q";

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>; 
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        //We can mock this service with jasmine, but is cleaner to do it with a "hand" object.
        mockActivatedRoute = {
            snapshot: { 
                paramMap: { get: () => { return '3' }}
            }
        }

        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            imports: [FormsModule],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation},
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'Joker', strength: 4})); 
    });

    it('should render hero name in a h2 tag', ()=>{
        //act
        fixture.detectChanges();

        //assert
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('JOKER');
    })

    //by adding the "done" parameter, we let Jasmine know that this is an async test and
    //it will wait untill we call the "done" function before finishing up the test. 
    // it('should call updateHero when save is called', (done) => {
    //     //arrange
    //     mockHeroService.updateHero.and.returnValue(of({}));

    //      //act
    //      fixture.detectChanges();
    //      fixture.componentInstance.save();

    //      //assert
    //      //wait 300 ms to assert since we added the debounce function. 
    //      setTimeout(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();    
    //         done();         
    //      }, 300);
    // })

    //the fakeAsync function returns another function that is passed to the test
    // it('should call updateHero when save is called', fakeAsync(() => {
    //     //arrange
    //     mockHeroService.updateHero.and.returnValue(of({}));

    //      //act
    //      fixture.detectChanges();
    //      fixture.componentInstance.save();
    //      //the reason we can do this is because Angular runs inside zone.js and the
    //      //fakeAsync method runs inside in a special kind of zone that allows us to control the clock
    //      //tick(250); //this moves forward 250 ms to simulate the waiting period. 
    //      flush(); //looks for any async code and moves the clock to the moment it finishes automatically.  

    //      //assert
    //      expect(mockHeroService.updateHero).toHaveBeenCalled();    
    // }))

    //this code relies on zone.js 
    //zone wrapps around the execution context and zone understand when a promise is pending and resolved.
    it('should call updateHero when save (with promise) is called', fakeAsync(() => {
        //arrange
        mockHeroService.updateHero.and.returnValue(of({}));

         //act
         fixture.detectChanges();
         fixture.componentInstance.save();
         
         //assert
         //returns a promise when all promises inside the component have been resolved. 
         fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
         });              
    }))
});
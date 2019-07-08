import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common'; //Make sure that we use Location from the angular dependency injector and not the object from the browser.
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>; 
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        //We can mock this service with jasmine, but is cleaner to do it with a "hand" object.
        mockActivatedRoute = {
            snapshot: { 
                paramMap: { get: () => {return '3'}}
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
});
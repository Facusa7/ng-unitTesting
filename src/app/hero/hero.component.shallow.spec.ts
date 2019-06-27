import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow tests)', () => {
    //Fixture is a wrapper of the component and its template
    let fixture : ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            //With this directive, we tell Angular to not fail when it does not found an attribute or an element.
            //using NO_ERRORS_SCHEMA could hide potencial problems.
            schemas: [NO_ERRORS_SCHEMA]             
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', () => {
        
        //arrange
        fixture.componentInstance.hero = { id: 1, name: 'Super', strength: 3 };
        
        //assert
        expect(fixture.componentInstance.hero.name).toEqual('Super');
    });

    it('should render the hero name in an anchor tag', () => {
        
        //arrange
        fixture.componentInstance.hero = { id: 1, name: 'Super', strength: 3 };
                
        //act
        //force the change so the anchor gets updated.
        fixture.detectChanges();

        //assert
        /* nativeElement: This property gets to handle to the DOM element that represents the container
        for the template and the querySelector (plain JS) allows us to get an element by its tag.
        textContent gets us the values inside the element ignoring the other HTML. In our case, it will 
        get us the hero name.
         */
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super');

        //debugElement is a wrapper around the DOM element
        //debugElement has a way to access to the routerLink directive for example, or navigate back to the component. 
        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Super');
    });

});
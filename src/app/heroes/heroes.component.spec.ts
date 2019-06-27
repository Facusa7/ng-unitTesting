import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id:1, name:'Spider', strength: 8},
            {id:2, name:'Woman', strength: 24},
            {id:33, name:'Hulk', strength: 55},
        ];

        mockHeroService = jasmine.createSpyObj(['getHero', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            //arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            //act
            component.delete(HEROES[2]);
    
            //assert
            expect(component.heroes.length).toBe(2);
        });

        it('should call deleteHero', () => {
            //arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            let heroToDelete = HEROES[2];

            //act
            component.delete(heroToDelete);
    
            //assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToDelete);
        });
    });
    
})
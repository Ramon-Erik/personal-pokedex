import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDialog } from './pokemon-dialog';

describe('PokemonDialog', () => {
  let component: PokemonDialog;
  let fixture: ComponentFixture<PokemonDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

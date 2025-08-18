import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItem } from './pokemon-item';

describe('PokemonItem', () => {
  let component: PokemonItem;
  let fixture: ComponentFixture<PokemonItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

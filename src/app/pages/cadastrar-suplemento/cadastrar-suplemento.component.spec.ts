import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSuplementoComponent } from './cadastrar-suplemento.component';

describe('CadastrarSuplementoComponent', () => {
  let component: CadastrarSuplementoComponent;
  let fixture: ComponentFixture<CadastrarSuplementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarSuplementoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarSuplementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

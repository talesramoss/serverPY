import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SuplementosService } from '../../views/suplementos/suplementos.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent {

  formulario!: FormGroup;

  constructor(
    private service: SuplementosService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('id')
    const idNumber = Number(id)

    if(id){
      this.service.getForIDSuplementos(idNumber).subscribe((suplemento: any) => {
        this.formulario.patchValue(suplemento)
      })
    }

    this.formulario = this.formBuilder.group({
      id: [''],
      nomeSuplemento: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      valor: ['']
    })
  }

  editarSuplemento() {
    console.log('chegou aqui', this.formulario.value);
    if(this.formulario.valid) {
      this.service.updateSuplemento(this.formulario.value).subscribe(() =>{
        this.router.navigate(['/listarSuplemento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarSuplemento'])
  }
}


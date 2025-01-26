import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuplementosService } from '../../views/suplementos/suplementos.service';
import { Suplemento } from '../../views/interface';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.scss'
})
export class ExcluirComponent {
  formulario: Suplemento[] = []
  suplementosService: any;

  constructor(
    private router : Router,
    private service : SuplementosService,
    private route: ActivatedRoute
  ) {

  }

  // ngOnInit(): void{
  //   const id = this.route.snapshot.paramMap.get('id')
  //       const idNumber = Number(id)

  //       if(id){
  //         this.service.getForIDSuplementos(idNumber).subscribe((suplemento) => {
  //           this.formulario = suplemento
  //         })
  //       }
  // }


  excluir(): void {

  }


  cancelar() {
    this.router.navigate(['/listarSuplementos'])
  }

}

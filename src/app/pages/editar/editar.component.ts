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
  formulario: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private suplementoService: SuplementosService,
        private router: Router
    ) {
      this.formulario = this.fb.group({
        suplemento_id: [null, Validators.required],
        nomeSuplemento: ['', Validators.required],
        marca: ['', Validators.required],
        valor: ['', [Validators.required, Validators.pattern(/^\d+,\d{2}$/)]]
    });
    }

    ngOnInit() {
        // Obtenha o ID do suplemento a partir dos parâmetros da rota
        this.route.params.subscribe(params => {
            const suplementoId = params['id']; // Certifique-se de que o ID está sendo passado corretamente
            console.log('ID do Suplemento:', suplementoId); // Adicione este log para verificar o ID

            if (suplementoId) {
                this.suplementoService.getForIDSuplementos(suplementoId).subscribe(suplemento => {
                    this.formulario.patchValue({
                        suplemento_id: suplemento.id,
                        nomeSuplemento: suplemento.nomeSuplemento,
                        marca: suplemento.marca,
                        valor: suplemento.valor
                    });
                }, error => {
                    console.error('Erro ao buscar suplemento:', error);
                });
            } else {
                console.error('ID do suplemento não encontrado nos parâmetros da rota.');
            }
        });
    }

    updateSuplemento() {
        if (this.formulario.valid) {
            const suplementoId = this.formulario.value.suplemento_id;
            const payload = {
                nomeSuplemento: this.formulario.value.nomeSuplemento,
                marca: this.formulario.value.marca,
                valor: this.formulario.value.valor
            };

            console.log('Atualizando suplemento com ID:', suplementoId); // Adicione este log para verificar o ID

            this.suplementoService.updateSuplemento(suplementoId, payload).subscribe(() => {
                // Navegue para a lista de suplementos ou faça outra ação
            }, error => {
                console.error('Erro ao atualizar suplemento:', error);
            });
        }
    }

  cancelar() {
    this.router.navigate(['/listarSuplementos'])
  }
}

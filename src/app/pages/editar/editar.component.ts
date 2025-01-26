import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Suplemento, SuplementosService } from '../../views/suplementos/suplementos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'] // Corrigido para styleUrls
})
export class EditarComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  private routeSub: Subscription | undefined;
  loading: boolean = false
  errorMessage: string | undefined;

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
    this.routeSub = this.route.params.subscribe(params => {
      const suplementoId = params['id'];
      console.log('ID do Suplemento:', suplementoId);

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

  ngOnDestroy() {
    // Desinscrever para evitar vazamentos de memória
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  updateSuplemento() {
    console.log('Método updateSuplemento chamado');
    console.log('Formulário válido:', this.formulario.valid);

    if (this.formulario.valid) {
      const suplementoId = this.formulario.value.suplemento_id;
      const payload: Suplemento = {
        nomeSuplemento: this.formulario.value.nomeSuplemento,
        marca: this.formulario.value.marca,
        valor: this.formulario.value.valor
      };

      console.log('Atualizando suplemento com ID:', suplementoId);
      console.log('Valores do formulário:', payload);
      this.loading = true;

      this.suplementoService.updateSuplemento(suplementoId, payload).subscribe(
        response => {
          console.log('Resposta da API:', response);
          this.loading = false;
          this.router.navigate(['/listarSuplementos']);
        },
        error => {
          this.loading = false;
          console.error('Erro ao atualizar suplemento:', error);
          this.errorMessage = 'Erro ao atualizar suplemento. Tente novamente mais tarde.';
        }
      );
    } else {
      console.log('Erros no formulário:', this.formulario.errors);
    }
  }

  atualizar() {
    this.router.navigate(['/listarSuplementos']);
  }
  cancelar() {
    this.router.navigate(['/listarSuplementos']);
  }
}

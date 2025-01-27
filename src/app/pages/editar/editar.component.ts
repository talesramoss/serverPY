import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SuplementosService } from '../../views/suplementos/suplementos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  formulario!: FormGroup;
  suplementoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private suplementoService: SuplementosService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicializa o formulário
    this.formulario = this.fb.group({
      suplemento_id: [null, Validators.required],
      nomeSuplemento: ['', Validators.required],
      marca: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern(/^\d+,\d{2}$/)]]
    });

    // Captura o ID da rota e carrega os dados do suplemento
    const id = this.route.snapshot.paramMap.get('id');
    this.suplementoId = id ? Number(id) : null;

    if (this.suplementoId) {
      this.suplementoService.getForIDSuplementos(this.suplementoId).subscribe({
        next: (suplemento) => {
          this.formulario.patchValue(suplemento);
        },
        error: (err) => {
          console.error('Erro ao carregar os dados do suplemento:', err);
          alert('Erro ao carregar os dados do suplemento.');
          this.router.navigate(['/listarSuplementos']);
        }
      });
    } else {
      console.error('ID inválido ou não encontrado na rota.');
      alert('ID inválido ou não encontrado!');
      this.router.navigate(['/listarSuplementos']);
    }
  }

  updateSuplemento(): void {
    if (this.formulario.valid && this.suplementoId) {
      const payload = this.formulario.value;

      this.suplementoService.updateSuplemento(this.suplementoId, payload).subscribe({
        next: () => {
          console.log('Suplemento atualizado com sucesso!');
          alert('Suplemento atualizado com sucesso!');
          this.router.navigate(['/listarSuplementos']);
        },
        error: (err) => {
          console.error('Erro ao atualizar o suplemento:', err);
          alert('Erro ao atualizar o suplemento. Verifique os dados e tente novamente.');
        }
      });
    } else {
      console.error('Formulário inválido ou ID não encontrado.');
      alert('Preencha os campos corretamente.');
    }
  }


  cancelar(): void {
    this.router.navigate(['/listarSuplementos']);
  }
}

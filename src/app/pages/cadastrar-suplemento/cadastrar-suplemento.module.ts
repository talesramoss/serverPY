import { NgModule } from "@angular/core";
import { CadastrarSuplementoComponent } from "./cadastrar-suplemento.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [ CadastrarSuplementoComponent ],
})

export class CadastrarSuplementoComponentModule {}

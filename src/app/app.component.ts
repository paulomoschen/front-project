import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from './service/user-service.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-project';

  public funcionarios: Array<any> = []
  public funcionario: any = {};
  public showCadastro: boolean = false;
  dataSource: any;
  displayedColumns: string[] = ['name', 'sobrenome', 'email', 'nis', 'delete'];

  constructor(
    private requisicaoService: UserServiceService,
  ) { }

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.requisicaoService.buscar('/funcionarios').then(response => {
      this.funcionarios = response;

      this.dataSource = new MatTableDataSource<Funcionario>(response);
    }).catch(err => console.log(err.message));
  }


  salvar() {
    this.funcionario.email = this.email.value;
    
    if (!(this.funcionario.name) || !(this.funcionario.email) || this.funcionario.nis < 0) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    this.requisicaoService.salvar('/funcionarios', this.funcionario).then(_ => {
      this.voltar();
      alert('Salvo com sucesso!');
    }).catch(response => alert(response.retorno));
  }

  editar() {
    this.requisicaoService.editar(`/funcionarios/${this.funcionario.id}`, this.funcionario).then(_ => {
      this.voltar();
      alert('editado com sucesso!');
    }).catch(_ => alert('Houve um erro, verifique os campos e tente novamente'));
  }

  showEdicao(event: any) {
    this.funcionario = event;
    this.showCadastro = true;
  }

  deletar(event: any) {
    this.funcionario = event;
    this.requisicaoService.deletar(`/funcionarios/${this.funcionario.id}`).then(_ => {
      this.voltar();
    }).catch(err => console.log(err.message));
  }

  cadastrar() {
    this.showCadastro = true;
  }

  voltar() {
    this.showCadastro = false;
    this.funcionario = {};
    this.buscar();
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve colocar um email';
    }
    return this.email.hasError('email') ? 'Email inválido' : '';
  }
}
export interface Funcionario {
  id: number;
  name: string;
  sobrenome: string;
  email: string;
  nis: string;
}
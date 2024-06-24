import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  horasDeEntrada: any[] = [];
  nuevaHoraDeEntrada: any = {};
  horaDeEntradaSeleccionada: any = {};
  modoEdicion: boolean = false;
  modalAbierto = false;
  residentes: any[] = [];
  departamentos: any[] = []; // Agregamos la lista de departamentos

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarHorasDeEntrada();
    this.cargarResidentes();
    this.cargarDepartamentos(); // Cargamos la lista de departamentos al inicializar el componente
  }

  cargarHorasDeEntrada() {
    this.apiService.getHorasDeEntrada().subscribe(
      (data: any[]) => {
        this.horasDeEntrada = data;
      },
      error => {
        console.error('Error al cargar horas de entrada', error);
      }
    );
  }

  cargarResidentes() {
    this.apiService.getResidentes().subscribe(
      (data: any[]) => {
        this.residentes = data;
      },
      error => {
        console.error('Error al cargar residentes', error);
      }
    );
  }

  cargarDepartamentos() {
    this.apiService.getDepartamentos().subscribe(
      (data: any[]) => {
        this.departamentos = data;
      },
      error => {
        console.error('Error al cargar departamentos', error);
      }
    );
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  crearHoraDeEntrada() {
    this.nuevaHoraDeEntrada.esInvitado = this.nuevaHoraDeEntrada.esInvitado === 'true';
    this.apiService.crearHoraDeEntrada(this.nuevaHoraDeEntrada).subscribe(
      (data: any) => {
        console.log('Hora de entrada creada:', data);
        this.cerrarModal();
        this.cargarHorasDeEntrada();
        this.nuevaHoraDeEntrada = {};
      },
      error => {
        console.error('Error al crear hora de entrada', error);
      }
    );
  }

  seleccionarHoraDeEntrada(horaDeEntrada: any) {
    this.horaDeEntradaSeleccionada = horaDeEntrada;
    this.modoEdicion = true;
  }


  guardarCambios(horaDeEntrada: any) {
    this.apiService.actualizarHoraDeEntrada(horaDeEntrada.id, horaDeEntrada).subscribe(
      (data: any) => {
        this.cargarHorasDeEntrada();
        this.cerrarModal();
      },
      error => {
        console.error('Error al actualizar residente', error);
      }
    );
  }

  eliminarHoraDeEntrada(id: number) {
    this.apiService.eliminarHoraDeEntrada(id).subscribe(
      () => {
        console.log('Hora de entrada eliminada');
        this.cargarHorasDeEntrada();
      },
      error => {
        console.error('Error al eliminar hora de entrada', error);
      }
    );
  }



  obtenerNombreResidente(idResidente: number): string {
    const residente = this.residentes.find(r => r.id === idResidente);
    return residente ? residente.nombre : '';
  }

  obtenerNombreDepartamento(idDepartamento: number): string {
    const departamento = this.departamentos.find(d => d.id === idDepartamento);
    return departamento ? departamento.nombre : '';
  }
}

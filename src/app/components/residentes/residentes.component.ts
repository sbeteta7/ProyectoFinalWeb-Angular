import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.css']
})
export class ResidentesComponent implements OnInit {

  residentes: any[] = [];
  departamentos: any[] = [];
  nuevoResidente: any = {};
  residenteSeleccionado: any = {};
  modoEdicion = false;
  modalAbierto = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarResidentes();
    this.cargarDepartamentos();
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.nuevoResidente = {};
    this.abrirModal();
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
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

  crearResidente() {
    // Lógica para crear un residente, similar a como lo tenías implementado
    this.nuevoResidente.tipo_persona = 2; // Valor por defecto para el campo oculto tipo_persona
    this.apiService.crearResidente(this.nuevoResidente).subscribe(
      (data: any) => {
        this.cargarResidentes();
        this.cerrarModal();
      },
      error => {
        console.error('Error al crear residente', error);
      }
    );
  }

  editarResidente(residente: any) {
    this.residenteSeleccionado = { ...residente }; // Hacer una copia para no mutar el objeto original
    this.modoEdicion = true;
    this.abrirModal();
  }

  guardarCambios(residente: any) {
    this.apiService.actualizarResidente(residente.id, residente).subscribe(
      (data: any) => {
        this.cargarResidentes();
        this.cerrarModal();
      },
      error => {
        console.error('Error al actualizar residente', error);
      }
    );
  }

  eliminarResidente(id: number) {
    this.apiService.eliminarResidente(id).subscribe(
      () => {
        console.log('Residente eliminado');
        this.cargarResidentes();
      },
      error => {
        console.error('Error al eliminar residente', error);
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

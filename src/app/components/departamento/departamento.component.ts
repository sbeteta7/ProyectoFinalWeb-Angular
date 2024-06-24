import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'app-departamento',
    templateUrl: './departamento.component.html',
    styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

    departamentos: any[] = [];
    nuevoDepartamento: any = {};
    departamentoSeleccionado: any = {};
    modalAbierto: boolean = false; // Controla la visibilidad del modal
    modoEdicion: boolean = false; // Indica si se está en modo de edición

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.cargarDepartamentos();
    }

    cargarDepartamentos() {
        this.apiService.getDepartamentos().subscribe(
            data => {
                this.departamentos = data;
            },
            error => {
                console.error('Error al cargar departamentos', error);
            }
        );
    }

    abrirModalEdicion(departamento: any) {
        this.modoEdicion = true;
        this.departamentoSeleccionado = {
            id: departamento.id,
            edificio: departamento.edificio,
            nombre: departamento.nombre,
            descripcion: departamento.descripcion
        };
        this.modalAbierto = true;
    }

    cerrarModal() {
        this.modalAbierto = false;
        this.modoEdicion = false;
        this.departamentoSeleccionado = {};
        this.nuevoDepartamento = {};
    }

    crearOActualizarDepartamento() {
        if (this.modoEdicion) {
            this.actualizarDepartamento();
        } else {
            this.crearDepartamento();
        }
    }

    crearDepartamento() {
        this.apiService.crearDepartamento(this.nuevoDepartamento).subscribe(
            data => {
                console.log('Departamento creado:', data);
                this.cargarDepartamentos();  // Recargar la lista después de crear
                this.cerrarModal();
                this.nuevoDepartamento = {}; // Limpiar el objeto para el próximo departamento
            },
            error => {
                console.error('Error al crear departamento', error);
            }
        );
    }

    actualizarDepartamento() {
        this.apiService.actualizarDepartamento(this.departamentoSeleccionado.id, this.departamentoSeleccionado).subscribe(
            data => {
                console.log('Departamento actualizado:', data);
                this.cargarDepartamentos();  // Recargar la lista después de actualizar
                this.cerrarModal();
                this.departamentoSeleccionado = {}; // Limpiar el objeto después de actualizar
            },
            error => {
                console.error('Error al actualizar departamento', error);
            }
        );
    }

    guardarCambios(departamento: any) {
        this.apiService.actualizarDepartamento(departamento.id, departamento).subscribe(
          (data: any) => {
            this.cargarDepartamentos();
            this.cerrarModal();
          },
          error => {
            console.error('Error al actualizar residente', error);
          }
        );
      }

    eliminarDepartamento(id: number) {
        this.apiService.eliminarDepartamento(id).subscribe(
            () => {
                console.log('Departamento eliminado');
                this.cargarDepartamentos();  // Recargar la lista después de eliminar
            },
            error => {
                console.error('Error al eliminar departamento', error);
            }
        );
    }
}

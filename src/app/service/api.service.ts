import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl  = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) { }

  // Método para obtener la lista de residentes
  public getResidentes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar_residentes`);
  }
  // Método para crear un residente
  public crearResidente(residenteData: any): Observable<any> {
    console.log(residenteData);
    return this.http.post(`${this.apiUrl}/residentes/crear/`, residenteData);
  }
  // Método para obtener un residente por su ID
  public getResidente(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/residentes/${id}/`);
  }
  // Método para actualizar un residente
  public actualizarResidente(id: number, residenteData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/residentes/${id}/`, residenteData)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Método para eliminar un residente
  public eliminarResidente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/residentes/${id}/`);
  }
  // Métodos similares para departamentos, horas de entrada, etc.
  // Ejemplo para departamentos
  public getDepartamentos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar_departamentos`);
  }

  public crearDepartamento(departamentoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/departamentos/crear/`, departamentoData);
  }
  // Método para obtener un residente por su ID
  public getDepartamento(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/departamentos/${id}/`);
  }
  // Método para actualizar un residente
  public actualizarDepartamento(id: number, depatamentoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/departamentos/${id}/`, depatamentoData);
  }
  // Método para eliminar un residente
  public eliminarDepartamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/departamentos/${id}/`);
  }
  // Método para obtener la lista de horas de entrada
  public getHorasDeEntrada(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar_hora_de_entrada`);
  }
  // Método para crear una hora de entrada
  public crearHoraDeEntrada(horaDeEntradaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hora_de_entrada/crear/`, horaDeEntradaData);
  }
  // Método para obtener una hora de entrada por su ID
  public getHoraDeEntrada(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/hora_de_entrada/${id}/`);
  }
  // Método para actualizar una hora de entrada
  public actualizarHoraDeEntrada(id: number, horaDeEntradaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/hora_de_entrada/${id}/`, horaDeEntradaData);
  }
  // Método para eliminar una hora de entrada
  public eliminarHoraDeEntrada(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hora_de_entrada/${id}/`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend devolvió un código de respuesta no exitoso
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

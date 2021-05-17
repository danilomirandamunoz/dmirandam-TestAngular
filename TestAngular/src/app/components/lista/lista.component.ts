import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [DatePipe]
})
export class ListaComponent implements OnInit {

  empleados:Empleado[]=[];
  empleadosAux:Empleado[]=[];
  


  constructor(
    private dbService: DatabaseService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dbService.listarEmpleados().subscribe((data) => {
      this.empleados = data;
      this.empleadosAux = data;
    });

  }

  buscar(text: string){

    this.empleados = this.empleadosAux.filter(item => {
      const term = text.toLowerCase();
      return item.Nombre.toLowerCase().includes(term)
          || item.DescripcionCargo.toLowerCase().includes(term)
          || item.Edad.toString().includes(term)
          || this.datePipe.transform(item.FechaContratacion,"dd/MM/yyyy").includes(term);
    });
  }

  eliminar(codEmpleado){
    this.dbService.eliminar(codEmpleado);
  }

}

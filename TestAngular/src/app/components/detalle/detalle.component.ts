import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { Pais } from 'src/app/models/pais.model';
import { DatabaseService } from 'src/app/services/database.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {

  formEmpleado: FormGroup;
  editable:number;
  codEmpleado:string;
  paises:any[]=[];
  areas:any[]=[];
  cargos:any[]=[];
  nombre:string;
  accion:string;
  cargoDescripcion:string;

  constructor(private route: ActivatedRoute,
    private paisService: PaisService,
    private dbService: DatabaseService,
    private router: Router) {

    this.cargarListas();
    this.crearFomulario();

   }

   ngOnInit(): void {
    this.route.params
    .subscribe(parametros => {
      this.codEmpleado = parametros['codEmpleado'];
      this.editable = parametros['editable'];
      
      if (this.codEmpleado) {
          this.dbService.obtenerEmpleado(this.codEmpleado)
          .subscribe((data)=>{
            console.log("obtenerEmpleado", data);
            this.cargarForm(data);
            console.log("this.editable", this.editable);
            if(this.editable == 0){
              console.log("this.editable", this.editable);
              this.formEmpleado.disable();
              this.nombre = data.Nombre;
              this.accion = "Ver";
            }
            else{
              this.nombre = data.Nombre;
              this.accion = "Editar";
            }
          })
      }
      else{
        this.editable = 1;
      }
    });
  }

   cargarListas(){
    this.paisService.obtenerPaises()
    .subscribe((data:any[])=>{
      this.paises = data;
    });

    this.dbService.listarAreas()
    .subscribe((data:any[])=>{
      console.log("Areas", data);
      this.areas = data;
    })

    
   }

   crearFomulario(){
    this.formEmpleado = new FormGroup({
      'Nombre': new FormControl('', [
        Validators.required
      ]),
      'FechaNacimiento': new FormControl('', [
        Validators.required
      ]),
      'CodPais': new FormControl('-1', [
        Validators.required, Validators.min(0)
      ]),
      'NombreUsuario': new FormControl('', [
        Validators.required
      ]),
      'FechaContratacion': new FormControl('', [
        Validators.required
      ]),
      'Estado': new FormControl('-1', [
        Validators.required, Validators.min(0)
      ]),
      'CodArea': new FormControl('-1', [
        Validators.required, Validators.min(0)
      ]),
      'CodCargo': new FormControl('-1', [
        Validators.required, Validators.min(0)
      ]),
      'Comision': new FormControl('', [
      ])
    },
    {validators:[this.validarEdad,this.validadorComision]}
    );
   }

   validadorComision: ValidatorFn = (fg: FormGroup) => {
    const comision = fg.get('Comision').value;
    const cargo = fg.get('CodCargo').value;
    let isValid = true;

    if(cargo!= '4'){
      return null
    }

    if(Number(comision)>100 || Number(comision)<0){
      isValid = false;
    }

    return isValid
    ? null
    : { comisionValida: true }
    
  };



   validarEdad: ValidatorFn = (fg: FormGroup) => {
    const fecha = fg.get('FechaNacimiento').value;
    let isValid = true;

    const bdate = new Date(fecha);
    const timeDiff = Math.abs(Date.now() - bdate.getTime() );
    let edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);

    if(edad>18){
      isValid = true;
    }
    else{
      isValid = false;
    }

    return isValid
    ? null
    : { edadValida: true }
    
  };





  cargarForm(empleado:Empleado){
    this.cambiarArea(empleado.CodArea, true);
    this.cargoDescripcion = empleado.DescripcionCargo;
    this.formEmpleado.setValue({
      Nombre:empleado.Nombre,
      CodArea:empleado.CodArea,
      CodCargo:empleado.CodCargo,
      CodPais:empleado.CodPais,
      Comision:empleado.Comision,
      Estado:empleado.Estado,
      FechaContratacion:empleado.FechaContratacion,
      FechaNacimiento:empleado.FechaNacimiento,
      NombreUsuario:empleado.NombreUsuario,
    });

    

  }

  

  cambiarArea(cod, tipo){

    this.dbService.listarCargos(cod)
    .subscribe((data:any[])=>{
      this.cargos = data;
      if(!tipo){
        this.formEmpleado.patchValue({
          CodCargo:'-1'
        })
      }
    })
  }

  

  cambiarCargo(codCargo, desc){
    this.cargoDescripcion = desc;

    if(codCargo!=4){
      this.formEmpleado.patchValue({
        Comision:''
      })
    }
  }

  guardar(){
    if(this.formEmpleado.valid){

      let empleado = new Empleado();
      empleado.CodArea = this.formEmpleado.value.CodArea;
      empleado.CodCargo = this.formEmpleado.value.CodCargo;
      empleado.CodPais = this.formEmpleado.value.CodPais;
      empleado.Comision = this.formEmpleado.value.Comision;
      empleado.Estado = this.formEmpleado.value.Estado;
      empleado.FechaContratacion = this.formEmpleado.value.FechaContratacion;
      empleado.FechaNacimiento = this.formEmpleado.value.FechaNacimiento;
      //empleado.Id = this.codEmpleado;
      empleado.Nombre = this.formEmpleado.value.Nombre;
      empleado.NombreUsuario = this.formEmpleado.value.NombreUsuario;
      empleado.DescripcionCargo = this.cargoDescripcion;
      empleado.Edad = this.obtenerEdad(this.formEmpleado.value.FechaNacimiento);

      this.dbService.guardarEmpleado(empleado, this.codEmpleado);
      this.router.navigate(['empleados']); 
    }
  }

  obtenerEdad(value){
    const bdate = new Date(value);
    const timeDiff = Math.abs(Date.now() - bdate.getTime() );
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }

}

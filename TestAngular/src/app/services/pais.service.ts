import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  url= 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code'

  obtenerPaises(){
    return this.http.get(this.url)
    .pipe(map(data=>{
      console.log("paises", data);
      return data;
    }))
  }
}

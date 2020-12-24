import { Component, OnInit } from '@angular/core';
import { TipoAsociacionService } from 'src/app/service/tipo-asociacion.service';
import { TipoAsociacion } from 'src/app/models/tipo-asociacion';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuariopersona } from 'src/app/models/usuario';

@Component({
  selector: 'app-listar-asociacion',
  templateUrl: './listar-asociacion.component.html',
  styleUrls: ['./listar-asociacion.component.css']
})
export class ListarAsociacionComponent implements OnInit {
  listausuarios : any;
  usuarioModel: Usuariopersona = new Usuariopersona();

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  ngOnInit(): void {
    this.listarusuarioper();
  }
  
  listarusuarioper(){
    this.usuarioService.getLista().subscribe(
      (datos)=>{ console.log(datos)
        this.listausuarios= datos[0]['CUR_USUARIO_PERSONA']
        console.log(datos[0]['CUR_USUARIO_PERSONA'])
      }
    )
  }
  deleteusuarioper(id:number){
    this.usuarioService.eliminarusua(id).subscribe(
      (datos)=>{
        if (datos != 0) {
          alert("Algo salió mal")
        }
        this.listarusuarioper();
      }
    )
  }

setusuario(usuario:any){
  this.usuarioModel.ape_mat = usuario.APE_MAT;
  this.usuarioModel.ape_pat = usuario.APE_PAT;
  this.usuarioModel.correo = usuario.CORREO;
  this.usuarioModel.dni = usuario.DNI;
  this.usuarioModel.f_nac = usuario.F_NAC;
  this.usuarioModel.nombre = usuario.NOMBRE;
  this.usuarioModel.telefono = usuario.TELEFONO;
  this.usuarioModel.ubicacion = usuario.UBICACION;
  this.usuarioModel.id_pers = usuario.ID_PERS;
}

update(usuario:any){
  console.log(usuario);
  this.usuarioService.actualizar(usuario).subscribe(
    (dato)=> {alert("Actualizado Correctamente") ;
    this.listarusuarioper()}
  )

}

}

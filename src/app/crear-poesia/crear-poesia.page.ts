import { Component, OnInit } from '@angular/core';
import { PoesiaService } from '../service/poesia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Poesia } from '../model/poesia';
@Component({
  selector: 'app-crear-poesia',
  templateUrl: './crear-poesia.page.html',
  styleUrls: ['./crear-poesia.page.scss'],
})
export class CrearPoesiaPage implements OnInit {

  poesia: Poesia = new Poesia();

  constructor(public alertController: AlertController,private poesiaService: PoesiaService, private activatedroute: ActivatedRoute, private navCtrl: NavController, public router: Router) { }

  ngOnInit() {
  }

  cancelar(){
    this.router.navigate(['inicio'])
  }

  crearPoesia(){
    console.log(this.poesia);
    this.poesiaService.insertPoesia(this.poesia);
    this.router.navigate(['inicio'])
  }
  actualizarFoto(data){
    console.log("Llego al metodo");
    this.poesia.imgUrl = data.url;
  }

}

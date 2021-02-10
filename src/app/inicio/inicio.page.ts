import { Component, OnInit } from '@angular/core';
import { PoesiaService } from '../service/poesia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Poesia } from '../model/poesia';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private authService: AuthService,public alertController: AlertController,private poesiaService: PoesiaService, private activatedroute: ActivatedRoute, private navCtrl: NavController, public router: Router) { }
  poesias: Observable<any[]>;
  

  ngOnInit() {

    this.poesias = this.poesiaService.getPoesias();
  }

  crearPoesia(){
    console.log(this.authService.getUserAuth());
    this.router.navigate(['crear-Poesia']);
    console.log("Registrate");
  }

 

 

}

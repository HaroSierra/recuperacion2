import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Producto } from '../modelos/producto';
import { ProductosService } from '../servicios/productos.service';
import { ModalEditComponent } from '../tabs/modal-edit/modal-edit.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  productList: Producto[] = [];
  loader!: HTMLIonLabelElement;
  open = true;

  constructor(private productService: ProductosService, private modalCtrl: ModalController) {}

  ngOnInit(): void {
    console.log('view did enter 2');
  }

  ionViewDidEnter() {
    console.log('view did enter 2');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (items) => {
        this.productList = items;
        console.log(this.productList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async edit(items:any) {
    const modal = await this.modalCtrl.create ({
      component: ModalEditComponent,
      componentProps: {
        items
      }
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('Hello, ${data}! ')
    }
  }

  delete(items:any) {
    console.log(items)
  }

}

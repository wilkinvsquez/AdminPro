import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _hideModal: boolean = true;
  public type: string;
  public id: string;
  public img?: string;

  public newImg: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hideModal() {
    return this._hideModal;
  }

  showModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-img.jpg'
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    // this.img = img;

    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${environment.base_url}/upload/${type}/${img}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }
}

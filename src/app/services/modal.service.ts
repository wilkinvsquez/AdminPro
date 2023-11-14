import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _hideModal: boolean = true;

  get hideModal() {
    return this._hideModal;
  }

  showModal() {
    this._hideModal = false;
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() {}
}

import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public picture: File;
  public imgTemp: any = null;

  constructor(
    public modalService: ModalService,
    private _fUploadService: FileUploadService
  ) {}
  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalService.closeModal();
  }

  changeImg(event: any) {
    this.picture = event.target.files[0];
    if (!event.target.files[0]) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    return;
  }

  uploadImg() {
    const type = this.modalService.type;
    const id = this.modalService.id;
    this._fUploadService
      .updatePicture(this.picture, type, id)
      .then((img) => {
        Swal.fire('Great', 'Profile picture succesfully updated', 'success');
        this.modalService.newImg.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Image can`t be uploaded', 'error');
      });
  }
}

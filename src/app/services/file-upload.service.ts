import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatePicture(
    file: File,
    type: 'users' | 'doctors' | 'hospitals' | string,
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      const data = await res.json();
      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

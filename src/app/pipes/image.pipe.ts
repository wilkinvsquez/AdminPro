import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: 'users' | 'doctors' | 'hospitals'): string {
    if (!img) {
      return `${environment.base_url}/upload/${type}/no-img.jpg`;
    } else if (img?.includes('https')) {
      return img;
    } else if (img) {
      return `${environment.base_url}/upload/${type}/${img}`;
    } else {
      return `${environment.base_url}/upload/${type}/no-img.jpg`;
    }
  }
}

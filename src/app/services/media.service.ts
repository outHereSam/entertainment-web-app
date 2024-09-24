import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../state/media/media.state';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  apiUrl = '../../assets/data.json';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<Media[]> {
    return this.http.get<Media[]>(this.apiUrl);
  }
}

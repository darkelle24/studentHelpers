import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  urlApi = `${environment.apiUrl}`

  getInfos(topicId?: number): Observable<any> {
    let querry: any = {}

    if (topicId)
      querry.params = new HttpParams({ fromObject: { topic: topicId } });

    return this.http.get<any>(this.urlApi + 'infos', querry)
  }

  getTopics(): Observable<any> {
    return this.http.get<any>(this.urlApi + 'topics')
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  public currentTopicsSubject: BehaviorSubject<any>;

  nameSaveTopics = "epitech-capstone-topics"

  urlUser = `${environment.apiUrl}`

  constructor(private http: HttpClient, private api: ApiService) {
    // @ts-ignore
    this.currentTopicsSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this.nameSaveTopics)));
    if (isDevMode()) {
      console.log(this.currentTopicsValue)
    }
  }

  public get currentTopicsValue(): any {
    return this.currentTopicsSubject.value;
  }

  actualizeTopics() {
    this.api.getTopics().subscribe({
      next: (values: any[]) => {
        localStorage.setItem(this.nameSaveTopics, JSON.stringify(values));
        this.currentTopicsSubject.next(values);
        if (isDevMode()) {
          console.log(values)
        }
      }
    })
  }
}

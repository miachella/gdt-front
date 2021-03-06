import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Annonce } from '../annonces.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})


export class ListeAnnoncesCollabService {
    annonceCourante: Annonce;
    me : number;
    constructor(private http: HttpClient, private authService : AuthService) { }

    recupererAnnonceCourante(): Annonce{
        return this.annonceCourante;
    }

    lister() : Observable<Annonce[]> {
        this.authService.collegueConnecteObs.subscribe(col => this.me = col.id);
        return this.http.get<Annonce[]>(`${environment.baseUrl}covoiturage/annonce-covoiturage?id=${this.me}`)
    }

    annulerAnnonce() : Observable<Annonce> {
        let annonce = new Annonce(this.annonceCourante);
        annonce.collegueId = this.me;
        annonce.status = "ANNULER";
        this.annonceCourante = annonce;
        return this.http.put<Annonce>(`${environment.baseUrl}covoiturage`, this.annonceCourante);
    }
    
}
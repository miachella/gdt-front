import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Covoiturage } from 'src/app/mock/mock-reservations';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { Collegue } from 'src/app/auth/auth.domains';
import { Time } from '@angular/common';

export interface DeplacementPro {
  id?: number;
	reserverPar?: Collegue;
	chauffeur: Collegue;
	vehicule: Object;
	date: Date;
	depart: string;
  destination: string;
	heureDepart: Time;
	passager: Collegue[];

}

@Injectable({
    providedIn: 'root'
  })
  export class ReservationCollabService {

    covoiturageCourant: Covoiturage;
    private subCovoiturageSelectionne = new Subject<Covoiturage>();
    me: number;


    constructor(private http: HttpClient, private authSrv: AuthService) { }

    recupererCovoiturageCourant(): Covoiturage{
        return this.covoiturageCourant;
    }

    lister(): Observable<Covoiturage[]> {
      this.authSrv.collegueConnecteObs.subscribe(col => this.me = col.id);
      return this.http.get<Covoiturage[]>(`${environment.baseUrl}covoiturage/reservation?id=${this.me}`);
    }

    listerResaVehicule(): Observable<DeplacementPro[]> {
      this.authSrv.collegueConnecteObs.subscribe(col => this.me = col.id);
      return this.http.get<DeplacementPro[]>(`${environment.baseUrl}deplacement-pro/deplacement?id=${this.me}`);
    }

  }
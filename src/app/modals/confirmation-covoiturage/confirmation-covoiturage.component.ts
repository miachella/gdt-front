import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnoncesCollabService } from 'src/app/menu/annonces-collab/annonces-collab.service';
import { Annonce } from 'src/app/menu/annonces-collab/annonces.domains';


@Component({
  selector: 'app-confirmation-covoiturage',
  templateUrl: './confirmation-covoiturage.component.html',
  styleUrls: ['./confirmation-covoiturage.component.scss']
})
export class ConfirmationCovoiturageComponent implements OnInit {

  public annonceCreee: Annonce;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private modalService: NgbModal, public annonceService: AnnoncesCollabService, private router : Router) { }

  ngOnInit(): void {
    this.annonceCreee = this.annonceService.annonceCreee;
    this.annonceService.getAnnonceObs().subscribe();
  }

  publierAnnonce(): void {
    this.annonceService.publierAnnonce().subscribe();
    this.router.navigateByUrl('/collaborateur/annonces?publication=ok');
  }

}

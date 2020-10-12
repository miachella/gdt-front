import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Covoiturage, listResa1, listResa2 } from '../../mock/mock-reservations'
import { AuthService } from 'src/app/auth/auth.service';
import { ReservationCollabService } from './reservations-collab.service'
import { ReservationsCollabModal } from '../../modals/reservations-collab-modal/reservations-collab.modal';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations-collab.component.html',
  styleUrls: ['./reservations-collab.component.scss']
})
export class ReservationsCollabComponent implements OnInit {

  @Input() list: Covoiturage[] = listResa1;
  @Input() listHist: Covoiturage[] = listResa2;
  p: number = 1;


  constructor(private srv: AuthService, private dataSrv: ReservationCollabService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (localStorage.getItem('status') != 'Collaborateur') {
      this.srv.secuRoute()
    }
  }

  afficherDetails(covoit: Covoiturage){
    this.dataSrv.covoiturageCourant = covoit;
    this.modalService.open(ReservationsCollabModal, { centered: true });
  }

}

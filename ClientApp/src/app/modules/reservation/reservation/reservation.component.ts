import { Component, OnInit } from '@angular/core';

import { ReservationsService } from 'src/service/reservations.service';
import { Reservation } from 'src/model/Reservation';
import { BuildingService } from 'src/service/building.service';
import { Building } from 'src/model/Building';
import { RoomService } from 'src/service/room.service';
import { Router } from '@angular/router';
import { DeltaTime } from 'src/model/Types/DeltaTime';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  startDate : Date = new Date();
  durata : number = -1;
  reservation: Reservation[];
  buildingList: Building[];
  selectedBuilding : Building;
  Durate : string [] = [
    'Mattina', 'Pomeriggio', 'Un Giorno', 'Due Giorni', 
    'Tre Giorni', 'Quattro Giorni', 'Cinque Giorni'
  ]
  
  constructor(private service: ReservationsService,private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.list();
    this.getBuildingList();
  }
  list(){
    this.service.List().subscribe(reservation=> this.reservation= reservation);
  }
  insert(reservation: Reservation){
    this.service.insert(reservation).subscribe(()=> this.list());
  }
  update(reservation: Reservation,Id : String){
    this.service.update(reservation, reservation.Id).subscribe(()=> this.list());
  }
  delete(reservation:Reservation){
    this.service.delete(reservation.Id).subscribe(()=> this.list());
  }
  verifica(){
    let endDate : Date;
    let startDate : Date; 
    switch (this.durata) {
      case 0: {
        startDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),9);
        endDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),13);
        break;
      }
      case 1: {
        startDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),14);
        endDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),18);
        break;

      }
      case 2: {
        startDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),9);
        endDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),18);
        break;
      }
        case 3: {
          startDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),9);
          endDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),18);
          endDate.setDate(this.startDate.getDate()+ 1);
          break;
        }
        case 4: {
          startDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),9);
          endDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),18);
          endDate.setDate(this.startDate.getDate()+ 2);
          break;
        }
        case 5: {
          startDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),9);
          endDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),18);
          endDate.setDate(this.startDate.getDate()+ 3);
          break;
        }
        case 6: {
          startDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),9);
          endDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate(),18);
          endDate.setDate(this.startDate.getDate()+ 4);
          break;   
        }
    
      default:return;
     }
    
    let interval = new DeltaTime();
    interval.StartTime = startDate.toISOString();
    interval.EndTime = endDate.toISOString();
    this.service.availableRooms( this.selectedBuilding.Id, interval.StartTime, interval.EndTime).subscribe(result => {
      this.roomService.verifiedRooms = result;
      this.roomService.interval= interval;
      console.log(result);
      this.router.navigate(['room']);
    });
  }
  getBuildingList(){
    this.service.getAllBuildings().subscribe(building=> this.buildingList=building);
}
  setBuilding(building : Building){
    this.selectedBuilding=building;
     
  }
  }
  


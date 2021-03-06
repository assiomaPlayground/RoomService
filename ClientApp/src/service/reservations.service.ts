import { Injectable, Inject } from '@angular/core';
import { Reservation } from 'src/model/Reservation';
import { Abstractservice } from './abstractservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Building } from 'src/model/Building';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService extends Abstractservice<Reservation>{
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl : String) { 
    super(http, baseUrl)
    this.type='reservation';
    
    
  }
  
  reservation(id: String): Observable<any>{

    return this.http.get<Reservation>(this.baseUrl +'api/'+this.type + '/user/'+ id);
  }

  wReservation(id: String, start: String, end: String):Observable<any>{
    return this.http.post<any>(this.baseUrl+'api/'+this.type+'/workspace/'+id,{	"StartTime" :start,"EndTime":end});
  }

  checkIn(roomId : String, date : String): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'api/'+this.type + "checkIn",{ "WorkSpaceId" : roomId,"Date" : date });

  }
  availableRooms(buildingId: String, startTime : string, endTime: string): Observable<any>{
    let startDate =  new Date (Date.parse(startTime));
    let endDate = new Date (Date.parse(endTime));
console.log(startDate.getUTCFullYear() + "/" + startDate.getMonth() + 1 + "/" + startDate.getUTCDate() + "/" + startDate.getHours() + "/" + endDate.getUTCFullYear() + "/" + endDate.getMonth() + "/" +  endDate.getUTCDate() + "/" + endDate.getHours());
    return this.http.get<any>(this.baseUrl +'api/'+ "Building/" + "CheckAvailability/" + buildingId + "/" + startDate.getUTCFullYear() + "/" + (startDate.getMonth()+1) + "/" + startDate.getUTCDate() + "/" + startDate.getHours() + "/" + endDate.getUTCFullYear() + "/" + (endDate.getMonth()+1) + "/" +  endDate.getUTCDate() + "/" + endDate.getHours());
  }

  userReservations(userId : string) : Observable<any[]>{
    return this.http.get<Reservation[]>(this.baseUrl + 'api/'+ this.type + '/User/'+userId);
  }

  userReservationsWorkSpaceavailability(userId : string) : Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + 'api/'+ this.type + '/WorkSpace/User/' + userId);
  }

  getAllBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(this.baseUrl +'api/'+ "Building/");
  }
 
  } 


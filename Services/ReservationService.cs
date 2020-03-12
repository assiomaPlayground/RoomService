﻿using MongoDB.Driver;
using RoomService.Models;
using RoomService.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoomService.Services
{
    /// <summary>
    /// Service for Reservation collection crud ops in abstract
    /// </summary>
    public class ReservationService : AbstractMongoCrudService<Reservation>
    {
        public ReservationService(IRoomServiceMongoSettings settings)
            => base.Init(settings, settings.ReservationCollection);

        public DeleteResult DeleteByUserId(string id)
            => Collection.DeleteMany(res => res.Owner == id);

        public DeleteResult DeleteByRoomId(string id)
            => Collection.DeleteMany(res => res.Target == id);

        public IEnumerable<Reservation> GetUserReservations(string id)
            => Collection.Find(res => res.Owner == id).ToEnumerable();

        public bool CheckIn(string id, string date)
        {
            //@TODO use external validator
            var reservation = Read(id);
            if (reservation.Status == Reservation.Statuses.CANCELLATA || 
                reservation.Status == Reservation.Statuses.CONCLUSA ||
                reservation.Status == Reservation.Statuses.CHECKIN
            )
                return false;
            //Valid status
            if (string.Compare(reservation.StartTime, date) > 0)
                return false;
            if (string.Compare(reservation.ExitTime, date) < 0)
                return false;
            //Date inside prenotation
            reservation.CheckIn.ToList().Add(date);
            reservation.Status = Reservation.Statuses.CHECKIN;
            return Update(id, reservation).IsAcknowledged;
        }
        public bool CheckOut(string id, string date)
        {
            var reservation = Read(id);
            if (reservation.Status != Reservation.Statuses.CHECKIN)
                return false;
            if (string.Compare(reservation.StartTime, date) > 0)
                return false;
            //Date inside prenotation
            reservation.CheckOut.ToList().Add(date);
            reservation.Status = Reservation.Statuses.INCORSO;
            return Update(id, reservation).IsAcknowledged;
        }
    }
}

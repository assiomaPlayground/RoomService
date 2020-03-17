﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using RoomService.Models.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoomService.Models
{
    public class WorkSpaceReservations : IModel, IOwnable
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRequired]
        [JsonProperty(NullValueHandling = NullValueHandling.Include)]
        public DeltaTime Times { get; set; }
        [BsonRequired]
        [JsonProperty(NullValueHandling = NullValueHandling.Include)]
        public string Owner { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Include)]
        public IEnumerable<string> Reservations { get; set; }
    }
}
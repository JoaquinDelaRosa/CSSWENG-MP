﻿using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public enum CustomerTypesEnum
    {
        PERSONAL,
        WALK_IN,
        FLEET,
        INSURANCE,
        OTHER
    }

    public class CustomerType : IDBEntity<CustomerType>
    {
        [Key]
        public CustomerTypesEnum CustomerTypeId { get; set; }
        [Required]
        public string Name { get; set; } = "";

        public override void AssignTo(CustomerType other)
        {
            CustomerTypeId = other.CustomerTypeId;
            Name = other.Name;
        }
    }
}

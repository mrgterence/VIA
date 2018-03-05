using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webOtt.Models
{
    public class UserViewModel
    {
        public class UserSearchBindingModel
        {
            public int UserID { get; set; }
            public string SearchTerm { get; set; }
            public string SearchKey { get; set; }
            public DateTime CreateDate { get; set; }
        }

        public class UserLoginBindingModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class UserRegisterBindingModel
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class UserListViewModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public DateTime LastLogin { get; set; }
            public bool Status { get; set; }
        }

        public class UserDetailViewModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Gender { get; set; }
            public DateTime? Birthday { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public int Role { get; set; }
            public bool Status { get; set; }
            public DateTime? LastLogin { get; set; }
            public DateTime? CreateDate { get; set; }
            public DateTime? ModifyDate { get; set; }
        }

        public class UserBindingModel
        {
            public string Name { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Gender { get; set; }
            public DateTime Birthday { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public int Role { get; set; }
            public bool Status { get; set; }
            public DateTime ModifyDate { get; set; }

        }

   
    }
}
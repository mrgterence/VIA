using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using webOtt.Database;
using System.Data.Entity;
using static webOtt.Models.UserViewModel;
using System.Data;
using System.Web.Http.Cors;

namespace webOtt.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        // Get all users
        [Route("")]
        [HttpGet]
        public IHttpActionResult GetAllUser()
        {
            List<UserDetailViewModel> user = new List<UserDetailViewModel>();
            using (var ctx = new testEntities())
            {
                user = ctx.users
                          .Where(x => x.IS_ENABLE == true && x.IS_DELETE == false && x.ROLE == 2)
                          .Select(u => new UserDetailViewModel()
                          {
                              Id = u.ID,
                              Name = u.NAME,
                              FirstName = u.FIRST_NAME,
                              LastName = u.LAST_NAME,
                              Email = u.EMAIL,
                              Password = u.PASSWORD,
                              Gender = u.GENDER,
                              Birthday = u.BIRTHDAY.Value,
                              Phone = u.PHONE,
                              Address = u.ADDRESS,
                              Role = u.ROLE.Value,
                              Status = u.IS_ENABLE,
                              LastLogin = u.LAST_LOGIN.Value,
                              ModifyDate = u.MODIFY_DATE.Value,
                              CreateDate = u.CREATE_DATE.Value
                          }).ToList<UserDetailViewModel>();
            }

            return Ok(user);
        }

        // Login 
        [Route("login")]
        [HttpPut]
        public IHttpActionResult UserLogin(UserLoginBindingModel login)
        {
            using (var ctx = new testEntities())
            {
                var existingUser = ctx.users
                                      .Where(x => x.EMAIL == login.Email && x.PASSWORD == login.Password)
                                      .FirstOrDefault<user>();

                if (existingUser != null)
                {
                    existingUser.LAST_LOGIN = DateTime.Now;

                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }

                return Ok(existingUser);
            }
        }

        // Register
        [Route("register")]
        [HttpPost]
        public IHttpActionResult Register(UserRegisterBindingModel register)
        {
            try
            {
                using (var ctx = new testEntities())
                {
                    var existingUser = ctx.users
                                         .Where(x => x.EMAIL == register.Email)
                                         .FirstOrDefault<user>();

                    if (existingUser != null)
                    {
                        throw new ConstraintException(register.Email + "already exist!");
                    }
                    else
                    {
                        ctx.users.Add(new user()
                        {
                            EMAIL = register.Email,
                            NAME = register.Name,
                            PASSWORD = register.Password,
                            ROLE = 2,
                            IS_ENABLE = true,
                            IS_DELETE = false,
                            CREATE_DATE = DateTime.Now,
                            MODIFY_DATE = DateTime.Now
                        });

                        ctx.SaveChanges();
                    }

                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
            return Ok();
        }

        // Get a user infomation
        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult GetUserById(int id)
        {
            UserDetailViewModel user = null;

            using (var ctx = new testEntities())
            {
                user = ctx.users
                          .Where(s => s.ID == id)
                          .Select(s => new UserDetailViewModel()
                          {
                              Name = s.NAME,
                              FirstName = s.FIRST_NAME,
                              LastName = s.LAST_NAME,
                              Email = s.EMAIL,
                              Password = s.PASSWORD,
                              Gender = s.GENDER,
                              Birthday = s.BIRTHDAY.Value,
                              Phone = s.PHONE,
                              Address = s.ADDRESS,
                              Role = s.ROLE.Value,
                              Status = s.IS_ENABLE,
                              LastLogin = s.LAST_LOGIN.Value,
                              ModifyDate = s.MODIFY_DATE.Value,
                              CreateDate = s.CREATE_DATE.Value
                          }).FirstOrDefault<UserDetailViewModel>();
            }

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // Update user information
        [Route("{id}")]
        [HttpPut]
        public IHttpActionResult UpdateUser(int id, UserBindingModel user)
        {
            using (var ctx = new testEntities())
            {
                var existingUser = ctx.users.Where(s => s.ID == id)
                                            .FirstOrDefault<user>();

                if (existingUser != null)
                {
                    existingUser.NAME = user.Name;
                    existingUser.FIRST_NAME = user.FirstName;
                    existingUser.LAST_NAME = user.LastName;
                    existingUser.EMAIL = user.Email;
                    existingUser.PASSWORD = user.Password;
                    existingUser.GENDER = user.Gender;
                    existingUser.BIRTHDAY = user.Birthday;
                    existingUser.PHONE = user.Phone;
                    existingUser.ADDRESS = user.Address;
                    existingUser.ROLE = user.Role;
                    existingUser.IS_ENABLE = user.Status;
                    existingUser.MODIFY_DATE = DateTime.Now;

                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // Active or deactive user
        [Route("{id}/status")]
        [HttpPut]
        public IHttpActionResult UserStatus(int id)
        {

            using (var ctx = new testEntities())
            {
                var existingUser = ctx.users.Where(s => s.ID == id)
                                            .FirstOrDefault<user>();

                if (existingUser != null)
                {
                    if (existingUser.IS_ENABLE == true)
                    {
                        existingUser.IS_ENABLE = false;
                    }
                    else
                    {
                        existingUser.IS_ENABLE = true;
                    }

                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // Delete a user
        [Route("{id}")]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            using (var ctx = new testEntities())
            {
                var user = ctx.users
                              .Where(s => s.ID == id)
                              .FirstOrDefault();

                ctx.Entry(user).State = EntityState.Deleted;
                ctx.SaveChanges();
            }

            return Ok();
        }

        // Post search history
        [Route("search/history")]
        [HttpPost]
        public IHttpActionResult History(UserSearchBindingModel search)
        {

            try
            {
                using (var ctx = new testEntities())
                {
                    ctx.search_history.Add(new search_history()
                    {
                        USER_ID = search.UserID,
                        SEARCH_TERM = search.SearchTerm,
                        SEARCH_KEY = search.SearchKey,
                        IS_ENABLE = true,
                        IS_DELETE = false,
                        CREATE_DATE = DateTime.Now
                    });
                    ctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok();
        }

        // Get a user search history
        [Route("search/history")]
        [HttpGet]
        public IHttpActionResult GetUserSearchHistory()
        {
            List<UserSearchBindingModel> search = new List<UserSearchBindingModel>();

            using (var ctx = new testEntities())
            {
              search = ctx.search_history
                          .Where(x => x.IS_ENABLE == true && x.IS_DELETE == false)
                          .Select(s => new UserSearchBindingModel()
                          {
                              UserID = s.USER_ID,
                              SearchTerm = s.SEARCH_TERM,
                              SearchKey  = s.SEARCH_KEY,
                              CreateDate = s.CREATE_DATE

                          }).ToList<UserSearchBindingModel>();
            }

            if (search == null)
            {
                return NotFound();
            }

            return Ok(search);
        }

    }
}

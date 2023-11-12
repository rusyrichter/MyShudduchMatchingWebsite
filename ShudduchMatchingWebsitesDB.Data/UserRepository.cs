using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace ShudduchMatchingWebsite.Data
{
    public class UserRepository
    {
        public string _connectionString;
        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public bool AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var exists = context.Users.Any(u => u.Email == user.Email);
            if (exists)
            {
                return true;
            }
               
            context.Users.Add(user);
            context.SaveChanges();
            return false;
        }
        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }
            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }
            return user;
        }
        public User GetByEmail(string email)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            return user;
        }
        public int GetUserIdPerEmail(string email)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            return context.Users.FirstOrDefault(q => q.Email == email).Id;

        }
        public void UpdateUser(User u)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Update Users SET Token = {u.Token} Where Email = {u.Email}" );
            context.Database.ExecuteSqlInterpolated($"Update Users SET ExpirationTime = {u.ExpirationTime} Where Email = {u.Email}");
            context.SaveChanges();
        }
        public void UpdatePassword(string token, string password)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var user = context.Users.FirstOrDefault(u => u.Token == token);

            if (user != null)
            {
                var hash = BCrypt.Net.BCrypt.HashPassword(password);
                user.PasswordHash = hash;
                context.SaveChanges();
            }
            else
            {
                return;
            }
           
        }
    }

}
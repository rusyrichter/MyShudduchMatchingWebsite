using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using ShudduchMatchingWebsite.Data;
using ShudduchMatchingWebsiteDB.Web.Models;
using System.Security.Claims;
using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;

namespace ShudduchMatchingWebsiteDB.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private string _connectionString;
        private readonly IConfiguration _configuration;

        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _configuration = configuration;
        }
        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel lvm)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(lvm.Email, lvm.Password);
            if (user == null)
            {
                return null;
            }
            var claims = new List<Claim>
            {
                new Claim("user", lvm.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();
            return user;
        }
        [HttpPost]
        [Route("signup")]
        public bool Signup(SignupViewModel user)
        {
            var repo = new UserRepository(_connectionString);
            return repo.AddUser(user, user.Password);
        }
        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

        [HttpPost]
        [Route("updateUser")]
        public void UpdateUser(User user)
        {
            var repo = new UserRepository(_connectionString);
            repo.UpdateUser(user);
        }
        [HttpPost]
        [Route("updatePassword")]
        public void UpdatePassword(UpdatePasswordViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            repo.UpdatePassword(vm.Token, vm.Password);
        }

        [Route("forgotpassword")]
        public IActionResult ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");
            if (!emailSettings.Exists())
            {
                return StatusCode(500, "Email settings are not configured properly.");
            }

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["Sender"]));
            emailMessage.To.Add(new MailboxAddress("", model.Email));
            emailMessage.Subject = "Password Reset";
            emailMessage.Body = new TextPart("html")
            {
                Text =
                $"Please reset your password by clicking on this link: {model.ResetLink}"
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    client.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

                    client.Connect("smtp.office365.com", 587, SecureSocketOptions.StartTls);
                    client.Authenticate(emailSettings["Sender"], emailSettings["Password"]);

                    client.Send(emailMessage);

                    client.Disconnect(true);
                    client.Dispose();
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Oops! Something went wrong. Please try again.");
                }

            }

            return Ok(new { Message = "Reset link sent to your email address." });
        }
    }
}

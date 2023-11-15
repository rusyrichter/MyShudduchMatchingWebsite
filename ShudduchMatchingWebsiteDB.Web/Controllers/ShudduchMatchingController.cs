using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShudduchMatchingWebsite.Data;
using ShudduchMatchingWebsiteDB.Web.Models;

namespace ShudduchMatchingWebsiteDB.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShudduchMatchingController : ControllerBase
    {
        private string _connectionString;

        public ShudduchMatchingController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addboy")]
        public void AddBoy(Boy boy)
        {
            var currentUser = User.Identity.Name;
            var userrepo = new UserRepository(_connectionString);
            boy.UserId = userrepo.GetUserIdPerEmail(currentUser);
            var repo = new ShudduchMatchingRepository(_connectionString);

            repo.AddBoy(boy);
        }

        [HttpGet]
        [Route("getAllBoys")]
        public List<Boy> GetAllBoys()
        {
            var currentUser = User.Identity.Name;
            var userrepo = new UserRepository(_connectionString);
            int userId = userrepo.GetUserIdPerEmail(currentUser);
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetAllBoys(userId);
        }
        [HttpPost]
        [Route("updateBoy")]
        public void UpdateBoy(Boy boy)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.Update(boy, boy.Id, user.Id);
        }
        [HttpPost]
        [Route("updateBusyStatus")]
        public void UpdateBusyStatus(Boy boy)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateBusyStatus(boy, boy.Id, user.Id);
        }
        [HttpPost]
        [Route("deleteBoy")]
        public void DeleteBoy(Boy boy)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.Delete(boy.Id, user.Id);
        }
        [HttpGet]
        [Route("getBoyById")]
        public Boy getBoyById(int id)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetBoyById(id, user.Id);
        }
        [HttpPost]
        [Route("updateAdditionalInfo")]
        public Boy UpdateAdditionalInfo(Boy b)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.UpdateAdditionalInfo(b.LookingFor, b.Personality, b.ContactInfo, b.Id, user.Id);
        }
        [HttpPost]
        [Route("addReference")]
        public void AddReference(Ref reference)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            reference.UserId = user.Id;
            repo.AddReference(reference);
        }
        [HttpGet]
        [Route("getReferencesbyBoyid")]
        public List<Ref> GetReferencesbyBoyid(int boyId)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetReferencesById(boyId, user.Id);
        }
        [HttpPost]
        [Route("deleteReference")]
        public void DeleteReference(Ref reference)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.DeleteReference(reference.Id, user.Id);
        }
        [HttpPost]
        [Route("updateReference")]
        public void UpdateReference(Ref reference)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateReference(reference, reference.Id, user.Id);
        }
        [HttpPost]
        [Route("upload")]
        public void Upload(UploadViewModel vm)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            string base64 = vm.Base64.Substring(vm.Base64.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"uploads/{vm.Name}", imageBytes);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.AddToFile(vm.Name, vm.BoyId, base64, user.Id);
        }
        [HttpPost]
        [Route("uploadPicture")]
        public void UploadPicture(UploadViewModel vm)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            string base64 = vm.Base64.Substring(vm.Base64.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"pictureuploads/{vm.Name}", imageBytes);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.AddToPicture(vm.Name, vm.BoyId, base64, user.Id);
        }

        [HttpPost]
        [Route("deleteupload")]
        public void DeleteUpload(UploadViewModel vm)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            string filePath = Path.Combine("uploads", vm.Name);
            System.IO.File.Delete(filePath);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.DeleteFile(vm.Name, vm.BoyId, user.Id);
        }

        [HttpPost]
        [Route("deletePictureupload")]
        public void DeletePictureUpload(UploadViewModel vm)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            string filePath = Path.Combine("pictureuploads", vm.Name);
            System.IO.File.Delete(filePath);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.DeletePicture(vm.Name, vm.BoyId, user.Id);
        }

        [HttpGet]
        [Route("download")]
        public IActionResult Download(string fileName)
        {
            string filePath = $"uploads/{fileName}";

            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "application/octet-stream", fileName);
            }
            else
            {
                return NotFound("File not found");
            }
        }
        [HttpGet]
        [Route("downloadPicture")]
        public IActionResult DownloadPicture(string pictureName)
        {
            string filePath = $"pictureuploads/{pictureName}";

            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "application/octet-stream", pictureName);
            }
            else
            {
                return NotFound("File not found");
            }
        }
        [HttpGet]
        [Route("getFileDownloaded")]
        public string GetFileName(int boyid)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetFileNamebyId(boyid, user.Id);
        }
        [HttpGet]
        [Route("getPictureDownloaded")]
        public string GetPictureDownloaded(int boyid)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetPictureNameById(boyid, user.Id);
        }



        [HttpPost]
        [Route("updateHowLong")]
        public void UpdateHowLong(Boy b)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateHowLong(b.HowLong, b.Id, user.Id);
        }
        [HttpGet]
        [Route("getBusy")]
        public BoyBusy GetBusy(int boyid)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);

            return repo.GetBusyById(boyid, user.Id);
        }

        [HttpPost]
        [Route("updateBusyInfo")]
        public void UpdateBusyInfo(BoyBusy boyBusy)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateBusyInfo(boyBusy, user.Id);
        }
        [HttpPost]
        [Route("addIdea")]
        public void AddIdea(Idea idea)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            idea.UserId = user.Id;
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.AddIdea(idea);
        }
        [HttpPost]
        [Route("removeIdea")]
        public void RemoveIdea(Idea idea)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.RemoveIdea(idea, user.Id);
        }
        [HttpPost]
        [Route("updateIdea")]
        public void UpdateIdea(Idea idea)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateIdea(idea, user.Id);
        }
        [HttpGet]
        [Route("getSelectedIdeas")]
        public List<Idea> GetSelectedIdeas(int boyid)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var repo = new ShudduchMatchingRepository(_connectionString);
            var ideas = repo.GetSelectedIdeas(boyid, user.Id);
            return ideas;

        }

    }
}

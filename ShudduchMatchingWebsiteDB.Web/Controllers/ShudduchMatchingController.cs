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
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.Update(boy, boy.Id);
        }
        [HttpPost]
        [Route("updateBusyStatus")]
        public void UpdateBusyStatus(Boy boy)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateBusyStatus(boy, boy.Id);
        }
        [HttpPost]
        [Route("deleteBoy")]
        public void DeleteBoy(Boy boy)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.Delete(boy.Id);
        }
        [HttpGet]
        [Route("getBoyById")]
        public Boy getBoyById(int id)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetBoyById(id);
        }
        [HttpPost]
        [Route("updateAdditionalInfo")]
        public Boy UpdateAdditionalInfo(Boy b)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.UpdateAdditionalInfo(b.LookingFor, b.Personality, b.ContactInfo, b.Id);
        }
        [HttpPost]
        [Route("addReference")]
        public void AddReference(Ref reference)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.AddReference(reference);
        }
        [HttpGet]
        [Route("getReferencesbyBoyid")]
        public List<Ref> GetReferencesbyBoyid(int boyId)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetReferencesById(boyId);
        }
        [HttpPost]
        [Route("deleteReference")]
        public void DeleteReference(Ref reference)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.DeleteReference(reference.Id);
        }
        [HttpPost]
        [Route("updateReference")]
        public void UpdateReference(Ref reference)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateReference(reference, reference.Id);
        }
        [HttpPost]
        [Route("upload")]
        public void Upload(UploadViewModel vm)
        {
            string base64 = vm.Base64.Substring(vm.Base64.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"uploads/{vm.Name}", imageBytes);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.AddToFile(vm.Name, vm.BoyId, base64);
        }
        [HttpPost]
        [Route("uploadPicture")]
        public void UploadPicture(UploadViewModel vm)
        {
            string base64 = vm.Base64.Substring(vm.Base64.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"pictureuploads/{vm.Name}", imageBytes);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.AddToPicture(vm.Name, vm.BoyId, base64);
        }

        [HttpPost]
        [Route("deleteupload")]
        public void DeleteUpload(UploadViewModel vm)
        {
            string filePath = Path.Combine("uploads", vm.Name);
            System.IO.File.Delete(filePath);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.DeleteFile(vm.Name, vm.BoyId);
        }

        [HttpPost]
        [Route("deletePictureupload")]
        public void DeletePictureUpload(UploadViewModel vm)
        {
            string filePath = Path.Combine("pictureuploads", vm.Name);
            System.IO.File.Delete(filePath);
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.DeletePicture(vm.Name, vm.BoyId);
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
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetFileNamebyId(boyid);
        }
        [HttpGet]
        [Route("getPictureDownloaded")]
        public string GetPictureDownloaded(int boyid)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            return repo.GetPictureNameById(boyid);
        }



        [HttpPost]
        [Route("updateHowLong")]
        public void UpdateHowLong(Boy b)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateHowLong(b.HowLong, b.Id);
        }
        [HttpGet]
        [Route("getBusy")]
        public BoyBusy GetBusy(int boyid)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);

            return repo.GetBusyById(boyid);
        }

        [HttpPost]
        [Route("updateBusyInfo")]
        public void UpdateBusyInfo(BoyBusy boyBusy)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateBusyInfo(boyBusy);
        }
        [HttpPost]
        [Route("addIdea")]
        public void AddIdea(Idea idea)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.AddIdea(idea);
        }
        [HttpPost]
        [Route("removeIdea")]
        public void RemoveIdea(Idea idea)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.RemoveIdea(idea);
        }
        [HttpPost]
        [Route("updateIdea")]
        public void UpdateIdea(Idea idea)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            repo.UpdateIdea(idea);
        }
        [HttpGet]
        [Route("getSelectedIdeas")]
        public List<Idea> GetSelectedIdeas(int boyid)
        {
            var repo = new ShudduchMatchingRepository(_connectionString);
            var ideas = repo.GetSelectedIdeas(boyid);
            return ideas;

        }

    }
}

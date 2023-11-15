using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShudduchMatchingWebsite.Data;
using ShudduchMatchingWebsiteDB.Web.Models;

namespace ShudduchMatchingWebsiteDB.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShudduchMatchingGirlController : ControllerBase
    {
        private string _connectionString;

        public ShudduchMatchingGirlController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addgirl")]
        public void AddGirl(Girl girl)
        {
            var currentUser = User.Identity.Name;
            var userrepo = new UserRepository(_connectionString);
            girl.UserId = userrepo.GetUserIdPerEmail(currentUser);
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.AddGirl(girl);
        }

        [HttpGet]
        [Route("getAllGirls")]
        public List<Girl> GetAllGirls()
        {
            var currentUser = User.Identity.Name;
            var userrepo = new UserRepository(_connectionString);
            int userId = userrepo.GetUserIdPerEmail(currentUser);
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            return repo.GetAllGirls(userId);
        }
        [HttpPost]
        [Route("updateGirl")]
        public void UpdateGirl(Girl girl)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.Update(girl, girl.Id);
        }
        [HttpPost]
        [Route("updateBusyStatus")]
        public void UpdateBusyStatus(Girl girl)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.UpdateBusyStatus(girl, girl.Id);
        }
        [HttpPost]
        [Route("deleteGirl")]
        public void DeleteBoy(Girl girl)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.Delete(girl.Id);
        }
        [HttpGet]
        [Route("getGirlById")]
        public Girl GetGirlById(int id)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            return repo.GetGirlById(id);
        }
        [HttpPost]
        [Route("updateAdditionalInfo")]
        public Girl UpdateAdditionalInfo(Girl g)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            return repo.UpdateAdditionalInfo(g.LookingFor, g.Personality, g.ContactInfo, g.Id);
        }
        [HttpPost]
        [Route("addReferenceToGirl")]
        public void AddReference(Ref reference)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.AddReference(reference);
        }
        [HttpGet]
        [Route("getReferencesbyGirlid")]
        public List<Ref> GetReferencesbyGirlid(int girlId)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            return repo.GetReferencesById(girlId);
        }
        [HttpPost]
        [Route("deleteReference")]
        public void DeleteReference(Ref reference)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.DeleteReference(reference.Id);
        }
        [HttpPost]
        [Route("updateReference")]
        public void UpdateReference(Ref reference)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.UpdateReference(reference, reference.Id);
        }
        [HttpPost]
        [Route("upload")]
        public void Upload(UploadViewModelGirl vm)
        {
            string base64 = vm.Base64.Substring(vm.Base64.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"uploads/{vm.Name}", imageBytes);
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.AddToFile(vm.Name, vm.GirlId, base64);
        }
        [HttpPost]
        [Route("uploadPicture")]
        public void UploadPicture(UploadViewModelGirl vm)
        {
            string base64 = vm.Base64.Substring(vm.Base64.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            System.IO.File.WriteAllBytes($"pictureuploads/{vm.Name}", imageBytes);
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.AddToPicture(vm.Name, vm.GirlId, base64);
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
        [HttpPost]
        [Route("deleteupload")]
        public void DeleteUpload(UploadViewModelGirl vm)
        {
            string filePath = Path.Combine("uploads", vm.Name);
            System.IO.File.Delete(filePath);
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.DeleteFile(vm.Name, vm.GirlId);
        }

        [HttpPost]
        [Route("deletePictureupload")]
        public void DeletePictureUpload(UploadViewModelGirl vm)
        {
            string filePath = Path.Combine("pictureuploads", vm.Name);
            System.IO.File.Delete(filePath);
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.DeletePicture(vm.Name, vm.GirlId);
        }
        [HttpGet]
        [Route("getFileDownloaded")]
        public string GetFileName(int girlid)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            return repo.GetFileNamebyId(girlid);
        }
        [HttpGet]
        [Route("getPictureDownloaded")]
        public string GetPictureDownloaded(int boyid)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            return repo.GetPictureNameById(boyid);
        }
        [HttpPost]
        [Route("updateHowLong")]
        public void UpdateHowLong(Girl g)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.UpdateHowLong(g.HowLong, g.Id);
        }
        [HttpGet]
        [Route("getBusy")]
        public GirlBusy GetBusy(int girlid)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            return repo.GetBusyById(girlid);
        }

        [HttpPost]
        [Route("updateBusyInfo")]
        public void UpdateBusyInfo(GirlBusy girlBusy)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.UpdateBusyInfo(girlBusy);
        }

        [HttpPost]
        [Route("addIdea")]
        public void AddIdea(Idea idea)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.AddIdea(idea);
        }
        [HttpPost]
        [Route("removeIdea")]
        public void RemoveIdea(Idea idea)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.RemoveIdea(idea);
        }
        [HttpPost]
        [Route("updateIdea")]
        public void UpdateIdea(Idea idea)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            repo.UpdateIdea(idea);
        }
        [HttpGet]
        [Route("getSelectedIdeas")]
        public List<Idea> GetSelectedIdeas(int girlid)
        {
            var repo = new ShudduchMatchingRepositoryGirl(_connectionString);
            var ideas = repo.GetSelectedIdeas(girlid);
            return ideas;

        }
    }
}

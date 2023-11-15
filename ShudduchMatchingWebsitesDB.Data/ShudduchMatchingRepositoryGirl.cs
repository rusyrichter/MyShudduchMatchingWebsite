using Microsoft.EntityFrameworkCore;

namespace ShudduchMatchingWebsite.Data
{
    public class ShudduchMatchingRepositoryGirl
    {
        public string _connectionString;
        public ShudduchMatchingRepositoryGirl(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddGirl(Girl girl)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Girls.Add(girl);
            context.SaveChanges();
        }
        public List<Girl> GetAllGirls(int userId)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            
              return context.Girls.Where(g => g.UserId == userId).ToList();           
        }
        public void Update(Girl girl, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var girlToUpdate = context.Girls.FirstOrDefault(g => g.Id == id);
            context.Girls.Update(girlToUpdate);

            if (girlToUpdate != null)
            {
                girlToUpdate.FirstName = girl.FirstName;
                girlToUpdate.LastName = girl.LastName;
                girlToUpdate.Age = girl.Age;
                girlToUpdate.Location = girl.Location;
                girlToUpdate.Schools = girl.Schools;
                girlToUpdate.Height = girl.Height;

                context.SaveChanges();
            }
        }
        public void UpdateBusyStatus(Girl girl, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var girlToUpdate = context.Girls.FirstOrDefault(g => g.Id == id);
            

            if (girlToUpdate != null)
            {
                girlToUpdate.Busy = girl.Busy;
                context.SaveChanges();
            }
        }
        public void Delete(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"delete from Ideas where GirlId = {id}");
            context.Database.ExecuteSqlInterpolated(@$"delete from Girls where Id = {id}");
         
        }
        public Girl GetGirlById(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            return context.Girls.FirstOrDefault(g => g.Id == id);
        }
        public Girl UpdateAdditionalInfo(string lookingFor, string personality, string contactInfo, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var girlToUpdate = context.Girls.Where(b => b.Id == id).FirstOrDefault();
            context.Database.ExecuteSqlInterpolated(@$"Update Girls Set LookingFor = {lookingFor} where Id = {id}");
            context.Database.ExecuteSqlInterpolated(@$"Update Girls Set Personality = {personality} where Id = {id}");
            context.Database.ExecuteSqlInterpolated(@$"Update Girls Set ContactInfo = {contactInfo} where Id = {id}");
            return girlToUpdate;
        }
        public void AddReference(Ref reference)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Refs.Add(reference);
            context.SaveChanges();
        }
        public List<Ref> GetReferencesById(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            return context.Refs.Where(g => g.GirlId == id).ToList();
        }
        public void DeleteReference(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);

            context.Database.ExecuteSqlInterpolated(@$"delete from Refs where Id = {id}");
        }
        public void UpdateReference(Ref reference, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var ref2Update = context.Refs.FirstOrDefault(g => g.Id == id);
            context.Refs.Update(ref2Update);

            if (ref2Update != null)
            {
                ref2Update.Name = reference.Name;
                ref2Update.Relation = reference.Relation;
                ref2Update.PhoneNumber = reference.PhoneNumber;

                context.SaveChanges();
            }
        }
        public void AddToFile(string name, int id, string base64)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var fileEntry = context.Files.Add(new File
            {
                Name = name,
                GirlId = id,
                BaseSixtyFour = base64,
            });
            context.SaveChanges();
        }

        public void AddToPicture(string name, int id, string base64)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var fileEntry = context.Pictures.Add(new Picture
            {
                Name = name,
                GirlId = id,
                BaseSixtyFour = base64,
            });
            context.SaveChanges();
        }
        public string GetFileNamebyId(int girlid)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var file = context.Files.FirstOrDefault(f => f.GirlId == girlid);
            if (file != null)
            {
                return file.Name;
            }
            else
            {
                return null;
            }

        }
        public string GetPictureNameById(int boyid)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var picture = context.Pictures.FirstOrDefault(p => p.BoyId == boyid);
            if (picture != null)
            {
                return picture.Name;
            }
            else
            {
                return null;
            }
        }

        public void DeleteFile(string name, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"delete from Files Where Girlid = {id} and Name = {name}");
            context.SaveChanges();

        }
        public void DeletePicture(string name, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"delete from Pictures Where GirlId = {id} and Name = {name}");
            context.SaveChanges();
        }
        public void UpdateHowLong(string howLong, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var girl = context.Girls.FirstOrDefault(g => g.Id == id);
            if (girl != null)
            {
                girl.HowLong = howLong;
            }
            context.SaveChanges();
        }

        public GirlBusy GetBusyById(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            return context.GirlBusy.FirstOrDefault(g => g.GirlId == id);
        }
       
        public void UpdateBusyInfo(GirlBusy busy)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var girlBusy = context.GirlBusy.FirstOrDefault(g => g.GirlId == busy.GirlId);
            if (girlBusy == null)
            {
                context.GirlBusy.Add(busy);               
            }
            else
            {
                girlBusy.NameOfOtherSide = busy.NameOfOtherSide;
                girlBusy.EmailAddress = busy.EmailAddress;
                girlBusy.HomePhone = busy.HomePhone;
                girlBusy.CellPhone = busy.CellPhone;
                girlBusy.Comments = busy.Comments;
                girlBusy.GotAYes = busy.GotAYes;
                girlBusy.SaidYes = busy.SaidYes;
                girlBusy.AmountOfTimesWentOut = busy.AmountOfTimesWentOut;
            }
            context.SaveChanges();
            
        }

        public void AddIdea(Idea ide)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var idea = context.Ideas.FirstOrDefault(i => i.BoyId == ide.BoyId && i.GirlId == ide.GirlId);
            if (idea == null)
            {
                context.Ideas.Add(new Idea
                {
                    BoyId = ide.BoyId,
                    GirlId = ide.GirlId,
                    UserId = ide.UserId,
                });
            }

            context.SaveChanges();
        }
        public void RemoveIdea(Idea ide)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"delete from Ideas where BoyId = {ide.BoyId} AND GirlId = {ide.GirlId}");
        }
        public List<Idea> GetSelectedIdeas(int girlid)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);

            var selectedIdeas = context.Ideas
                .Where(i => i.GirlId == girlid)
                .Join(
                    context.Boys,
                    idea => idea.BoyId,
                    girl => girl.Id,
                    (idea, girl) => new Idea
                    {
                        GirlId = idea.GirlId,
                        BoyId = idea.BoyId,
                        Comments = idea.Comments,
                        FirstName = girl.FirstName,
                        LastName = girl.LastName,
                        Age = girl.Age,
                        Location = girl.Location,
                        Schools = girl.Schools
                    })
                .ToList();

            return selectedIdeas;
        }

        public void UpdateIdea(Idea ide)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"Update Ideas Set Comments = {ide.Comments} Where BoyId = {ide.BoyId} AND GirlId = {ide.GirlId}");
        }

    }

}


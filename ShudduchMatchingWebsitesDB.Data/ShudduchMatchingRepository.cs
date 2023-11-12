using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ShudduchMatchingWebsite.Data
{
    public class ShudduchMatchingRepository
    {
        public string _connectionString;
        public ShudduchMatchingRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBoy(Boy boy)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Boys.Add(boy);
            context.SaveChanges();
        }
        public List<Boy> GetAllBoys(int userId)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            return context.Boys.Where(b => b.UserId == userId).ToList();
        }
        public void Update(Boy boy, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var boyToUpdate = context.Boys.FirstOrDefault(b => b.Id == id);

            if (boyToUpdate != null)
            {
                boyToUpdate.FirstName = boy.FirstName;
                boyToUpdate.LastName = boy.LastName;
                boyToUpdate.Age = boy.Age;
                boyToUpdate.Location = boy.Location;
                boyToUpdate.Schools = boy.Schools;
                boyToUpdate.Height = boy.Height;

                context.SaveChanges();
            }
            context.Boys.Update(boyToUpdate);


        }
        public void UpdateBusyStatus(Boy boy, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var boyToUpdate = context.Boys.FirstOrDefault(b => b.Id == id);
            context.Boys.Update(boyToUpdate);

            if (boyToUpdate != null)
            {
                boyToUpdate.Busy = boy.Busy;
                context.SaveChanges();
            }
        }
        public void Delete(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"delete from Ideas where BoyId = {id}");
            context.Database.ExecuteSqlInterpolated(@$"delete from Boys where Id = {id}");

        }
        public Boy GetBoyById(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            return context.Boys.FirstOrDefault(b => b.Id == id);
        }
        public Boy UpdateAdditionalInfo(string lookingFor, string personality, string contactInfo, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var boyToUpdate = context.Boys.Where(b => b.Id == id).FirstOrDefault();
            context.Database.ExecuteSqlInterpolated(@$"Update Boys Set LookingFor = {lookingFor} where Id = {id}");
            context.Database.ExecuteSqlInterpolated(@$"Update Boys Set Personality = {personality} where Id = {id}");
            context.Database.ExecuteSqlInterpolated(@$"Update Boys Set ContactInfo = {contactInfo} where Id = {id}");
            return boyToUpdate;
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
            return context.Refs.Where(b => b.BoyId == id).ToList();
        }
        public void DeleteReference(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);

            context.Database.ExecuteSqlInterpolated(@$"delete from Refs where Id = {id}");
        }
        public void UpdateReference(Ref reference, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var ref2Update = context.Refs.FirstOrDefault(b => b.Id == id);
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
                BoyId = id,
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
                BoyId = id,
                BaseSixtyFour = base64,
            });
            context.SaveChanges();
        }


        public void DeleteFile(string name, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"delete from Files Where BoyId = {id} and Name = {name}");
            context.SaveChanges();
        }
        public void DeletePicture(string name, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"delete from Pictures Where BoyId = {id} and Name = {name}");
            context.SaveChanges();
        }
        public string GetFileNamebyId(int boyid)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var file = context.Files.FirstOrDefault(f => f.BoyId == boyid);
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
        public void UpdateHowLong(string howLong, int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var boy = context.Boys.FirstOrDefault(b => b.Id == id);
            if (boy != null)
            {
                boy.HowLong = howLong;
            }
            context.SaveChanges();
        }
        public BoyBusy GetBusyById(int id)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            return context.Busy.FirstOrDefault(b => b.BoyId == id);
        }
        public void UpdateBusyInfo(BoyBusy busy)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var boyBusy = context.Busy.FirstOrDefault(b => b.BoyId == busy.BoyId);
            if (boyBusy == null)
            {
                context.Busy.Add(busy);
            }
            else
            {
                boyBusy.NameOfOtherSide = busy.NameOfOtherSide;
                boyBusy.EmailAddress = busy.EmailAddress;
                boyBusy.HomePhone = busy.HomePhone;
                boyBusy.CellPhone = busy.CellPhone;
                boyBusy.Comments = busy.Comments;
                boyBusy.GotAYes = busy.GotAYes;
                boyBusy.SaidYes = busy.SaidYes;
                boyBusy.AmountOfTimesWentOut = busy.AmountOfTimesWentOut;
            }
            context.SaveChanges();

        }
        public void AddIdea(Idea ide)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            var idea = context.Ideas.FirstOrDefault(i => i.BoyId == ide.BoyId && i.GirlId == ide.GirlId);
            if(idea == null)
            {
                context.Ideas.Add(new Idea
                {
                    BoyId = ide.BoyId,
                    GirlId = ide.GirlId,
                });
            }
           
            context.SaveChanges();
        }

        public void UpdateIdea(Idea ide)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"Update Ideas Set Comments = {ide.Comments} Where BoyId = {ide.BoyId} AND GirlId = {ide.GirlId}");
        }
        public void RemoveIdea(Idea ide)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"delete from Ideas where BoyId = {ide.BoyId} AND GirlId = {ide.GirlId}");
        }
        public List<Idea> GetSelectedIdeas(int boyid)
        {
            using var context = new ShudduchMatchingDBContext(_connectionString);

            var selectedIdeas = context.Ideas
                .Where(i => i.BoyId == boyid)
                .Join(
                    context.Girls,
                    idea => idea.GirlId,
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



    }

}
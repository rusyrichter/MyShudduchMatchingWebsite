using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ShudduchMatchingWebsite.Data
{
    public class ShudduchMatchingDBContextFactory : IDesignTimeDbContextFactory<ShudduchMatchingDBContext>
    {

        public ShudduchMatchingDBContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ShudduchMatchingWebsiteDB.Web"))
               .AddJsonFile("appsettings.json")
               .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new ShudduchMatchingDBContext(config.GetConnectionString("ConStr"));
        }
    }

}
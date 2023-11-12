using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ShudduchMatchingWebsite.Data
{
    public class ShudduchMatchingDBContext : DbContext
    {
        private string _connectionString;

        public ShudduchMatchingDBContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        public DbSet<Boy> Boys { get; set; }
        public DbSet<Girl> Girls { get; set; }
        public DbSet<Ref> Refs { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<BoyBusy> Busy { get; set; }
        public DbSet<GirlBusy> GirlBusy { get; set; }
        public DbSet<Idea> Ideas { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<Idea>()
                .HasKey(qt => new { qt.BoyId, qt.GirlId });

            base.OnModelCreating(modelBuilder);
        }

    }

}
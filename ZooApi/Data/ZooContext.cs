using Microsoft.EntityFrameworkCore;
using ZooApi.Models;

namespace ZooApi.Data
{
    public class ZooContext : DbContext
    {
        public ZooContext(DbContextOptions<ZooContext> options) : base(options)
        {
        }

        public DbSet<Animal> Animals { get; set; }
        public DbSet<Care> Cares { get; set; }
        public DbSet<AnimalCare> AnimalCares { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Animal>()
            //     .HasMany(a => a.AnimalCares)
            //     .WithOne(ac => ac.Animal)
            //     .HasForeignKey(ac => ac.AnimalId);

            // modelBuilder.Entity<Care>()
            //     .HasMany(c => c.AnimalCares)
            //     .WithOne(ac => ac.Care)
            //     .HasForeignKey(ac => ac.CareId);

            // Uncomment if you want to use a many-to-many relationship
            // modelBuilder.Entity<AnimalCare>()
            //     .HasKey(ac => new { ac.AnimalId, ac.CareId });
        }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<AnimalCare>()
        //         .HasKey(ac => new { ac.AnimalId, ac.CareId });

        //     modelBuilder.Entity<AnimalCare>()
        //         .HasMany<Animal>()
        //         .WithMany();

        //     modelBuilder.Entity<AnimalCare>()
        //         .HasMany<Care>()
        //         .WithMany();
        // }
    }
}
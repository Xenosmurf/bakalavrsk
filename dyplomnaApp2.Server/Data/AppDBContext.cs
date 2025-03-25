using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dyplomnaApp2.Server.Data
{
    public class AppDBContext : IdentityDbContext<ApplicationUser>
    {
        public AppDBContext(DbContextOptions<AppDBContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<AdvertisementModel> Advertisement { get; set; }

        public DbSet<ProfileModel> Profile { get; set; }
        public DbSet<PriceItemModel> PriceItem { get; set; }

        //public DbSet<ReviewModel> ReviewTable { get; set; }
        public DbSet<ReviewAsEmployerModel> ReviewAsEmployer { get; set; }
        public DbSet<ReviewAsExpertModel> ReviewAsExpert { get; set; }

        public DbSet<PostCardModel> PostCard { get; set; }

        public DbSet<PostImages> PostImages { get; set; }

        public DbSet<CategoryModel> Category { get; set; }

        public DbSet<CategoryProfile> CategoryProfile { get; set; }

        public DbSet<AdImages> AdImages { get; set; }

        public DbSet<PortfolioImageModel> PortfolioImage { get; set; }

        public DbSet<RequestModel> Request {  get; set; }

        public DbSet<RelationsModel> Relations { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Relations
            modelBuilder.Entity<RelationsModel>()
                .HasKey(r => r.RelationsId);

            //Request notitfication
            modelBuilder.Entity<RequestModel>()
                .HasKey(r => r.RequestId);


            //Portfolio images
            modelBuilder.Entity<PortfolioImageModel>()
                .HasKey(p => p.PortfolioImageId);


            //Ad Images
            modelBuilder.Entity<AdImages>()
                .HasKey(img => img.PostImageId);


            //Category Profile
            modelBuilder.Entity<CategoryProfile>()
          .HasKey(cp => cp.CategoryProfileId);


            //Category
            modelBuilder.Entity<CategoryModel>()
                .HasKey(c => c.CategoryId);


            //Post Images
            modelBuilder.Entity<PostImages>()
                .HasKey(img => img.PostImageId);


            //Post Card
            modelBuilder.Entity<PostCardModel>()
                .HasKey(post => post.PostId);

            //modelBuilder.Entity<PostCardModel>()
            //   .HasMany(post => post.PostImages)
            //   .WithOne(image => image.PostCard)
            //   .HasForeignKey(image => image.PostId);


            //Review As Employer
            modelBuilder.Entity<ReviewAsEmployerModel>()
                .HasKey(rev => rev.ReviewId); 


            //Review As Expert
            modelBuilder.Entity<ReviewAsExpertModel>()
                .HasKey(rev => rev.ReviewId);


            //Price Item
            modelBuilder.Entity<PriceItemModel>()
                .HasKey(price => price.PriceItemId);


            //Profile Model
            modelBuilder.Entity<ProfileModel>()
                .HasKey(pr => pr.UserId);


            //Advertisement Model
            modelBuilder.Entity<AdvertisementModel>()
                .HasKey(ad => ad.AdId);

            modelBuilder.Entity<AdvertisementModel>()
               .HasOne(ad => ad.UserId)
               .WithMany(profile => profile.Advertisement)
               .HasForeignKey(ad => ad.AuthorId);
        }
    }
}

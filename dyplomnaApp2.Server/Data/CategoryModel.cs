namespace dyplomnaApp2.Server.Data
{
    public class CategoryModel
    {
        public Guid CategoryId { get; set; }
        public Guid? ParentCategoryId { get; set; }
        public string CategoryName { get; set; }

    }
}

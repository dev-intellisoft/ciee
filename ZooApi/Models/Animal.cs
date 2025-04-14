namespace ZooApi.Models
{

    public class Animal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime BirthDate { get; set; }
        public string Species { get; set; }
        public string Habitat { get; set; }
        public string CountryOfOrigin { get; set; }
        public List<Care> Cares { get; set; } = new();
    }
}
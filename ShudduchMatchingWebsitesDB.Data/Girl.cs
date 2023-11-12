namespace ShudduchMatchingWebsite.Data
{
    public class Girl
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Location { get; set; }
        public decimal Height { get; set; }
        public bool LongTermLerner { get; set; }
        public string Schools { get; set; }
        public string LookingFor { get; set; }
        public string Personality { get; set; }
        public string HowLong { get; set; }
        public string ContactInfo { get; set; }
        public bool Busy { get; set; }
        public List<Idea>Ideas { get; set; }
        public int UserId { get; set; }
    }

}
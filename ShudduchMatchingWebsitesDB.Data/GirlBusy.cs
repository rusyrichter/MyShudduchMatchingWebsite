namespace ShudduchMatchingWebsite.Data
{
    public class GirlBusy
    {
        public int Id { get; set; }
        public int GirlId { get; set; }
        public string NameOfOtherSide { get; set; }
        public bool SaidYes { get; set; }
        public bool GotAYes { get; set; }
        public int AmountOfTimesWentOut { get; set; }
        public bool Busy { get; set; }
        public string EmailAddress { get; set; }
        public string HomePhone { get; set; }
        public string CellPhone { get; set; }
        public string Comments { get; set; }
        public int UserId { get; set; }
    }
}

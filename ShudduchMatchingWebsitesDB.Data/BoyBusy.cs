using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShudduchMatchingWebsite.Data
{
    public class BoyBusy
    {
        public int Id { get; set; }
        public int BoyId { get; set; }
        public string NameOfOtherSide { get; set; }
        public bool SaidYes { get; set; }
        public bool GotAYes { get; set; }   
        public int AmountOfTimesWentOut { get; set; }
        public string EmailAddress { get; set; }
        public string HomePhone { get; set; }
        public string CellPhone { get; set; }
        public string Comments { get; set; }
    }
}

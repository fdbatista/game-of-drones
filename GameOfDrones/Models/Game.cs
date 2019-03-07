using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameOfDrones.Models
{
    public class Game
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int Rounds { get; set; }

        public DateTime Datetime { get; set; }

        [Required]
        public int WinnerId { get; set; }

        [ForeignKey("WinnerId")]
        public Player Winner { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameOfDrones.Models
{
    public class GoDContext : DbContext
    {
        public GoDContext(DbContextOptions<GoDContext> options)
            : base(options)
        { }

        public GoDContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=GameOfDronesDB;Trusted_Connection=True;ConnectRetryCount=0");
        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Log> Logs { get; set; }
    }
}

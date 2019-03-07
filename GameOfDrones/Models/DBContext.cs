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

        public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
    }
}

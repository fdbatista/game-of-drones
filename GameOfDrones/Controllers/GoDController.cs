using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameOfDrones.Models;
using Newtonsoft.Json.Linq;

namespace GameOfDrones.Controllers
{
    [Route("api/god")]
    [ApiController]
    public class GoDController : ControllerBase
    {
        private readonly GoDContext _context;

        public GoDController(GoDContext context)
        {
            _context = context;
        }

        // GET: api/god
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetPlayers(int page, int pageSize)
        {
            var allPlayers = await _context.Players.Include("WonGames").ToListAsync();
            int playersCount = allPlayers.Count;

            var pageCount = (double)playersCount / pageSize;
            pageCount = (int)Math.Ceiling(pageCount);
            var pages = new List<int>();
            for (var i = 1; i <= pageCount; i++) {
                pages.Add(i);
            }

            var players = allPlayers.OrderByDescending(p => p.WonGames.Count).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var res = new List<Object>() { players, pages };
            return res;
        }

        // GET: api/god/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            var player = await _context.Players.FindAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        // POST: api/god
        [HttpPost]
        public async Task<ActionResult<int>> PostPlayer([FromBody]JObject data)
        {
            var currDateTime = DateTime.Now;
            Player player = data["player"].ToObject<Player>();
            var playerName = player.Name;
            int rounds = data["rounds"].ToObject<int>();
            if (ModelState.IsValid)
            {
                try
                {
                    player = PlayerExists(playerName);
                    if (player == null)
                    {
                        player = new Player
                        {
                            Name = playerName
                        };
                        _context.Players.Add(player);
                        await _context.SaveChangesAsync();
                    }

                    var game = new Game
                    {
                        Datetime = currDateTime,
                        Rounds = rounds,
                        Winner = player
                    };
                    _context.Games.Add(game);

                    var log = new Log
                    {
                        IsError = 0,
                        Datetime = currDateTime,
                        Description = $"Player {playerName} has won a new game."
                    };
                    _context.Logs.Add(log);
                    await _context.SaveChangesAsync();
                    return 1;
                }
                catch (Exception exc)
                {
                    var log = new Log
                    {
                        IsError = 1,
                        Datetime = currDateTime,
                        Description = $"The following error was thrown while trying to register a new win to {playerName}: " + exc.Message
                    };
                    _context.Logs.Add(log);
                    await _context.SaveChangesAsync();
                    return 0;
                }
            }
            return -1;
        }

        private Player PlayerExists(string name)
        {
            var normName = name.Trim().ToUpper();
            return _context.Players.Where(e => e.Name == normName).FirstOrDefault();
        }
    }

    public class NewGame {
        public Player player { get; set; }
        public int rounds { get; set; }
    }
}

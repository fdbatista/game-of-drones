using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameOfDrones.Models;

namespace GameOfDrones.Controllers
{
    [Route("api/logs")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly GoDContext _context;

        public LogsController(GoDContext context)
        {
            _context = context;
        }

        // GET: api/logs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetLogs(int page, int pageSize)
        {
            var allItems = await _context.Logs.ToListAsync();
            int itemsCount = allItems.Count;

            var pageCount = (double)itemsCount / pageSize;
            pageCount = (int)Math.Ceiling(pageCount);
            var pages = new List<int>();
            for (var i = 1; i <= pageCount; i++) {
                pages.Add(i);
            }

            var items = allItems.OrderByDescending(p => p.Datetime).Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var res = new List<Object>() { items, pages };
            return res;
        }
        
    }
}

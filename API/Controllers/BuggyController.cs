using API.Error;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseController
    {
        private readonly ApplicationDbContext _context;

        public BuggyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult notFound()
        {
            //var notFoundThing = _context.Products.Find(44);

            //if (notFoundThing == null) 
            return NotFound(new ApiResponse(400, "msh l2yno wlahy"));

            //return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult serverError()
        {
            var notFoundThing = _context.Products.Find(44);

            var serverError = notFoundThing.ToString();

            return Ok();
        }

        [HttpGet("badRequest")]
        public ActionResult badRequest()
        {
            return BadRequest();
        }

        [HttpGet("badRequest/{id}")]
        public ActionResult ValidationError(int id)
        {
            return Ok();
        }
    }
}
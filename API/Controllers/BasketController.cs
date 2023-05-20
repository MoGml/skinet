using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository _basket;

        public BasketController(IBasketRepository basket)
        {
            _basket = basket;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasket(string id)
        {
            var basket = await _basket.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            return Ok(await _basket.UpdateBasketAsync(basket));
        }

        [HttpDelete]
        public async Task<bool> DeleteBasket(string id)
        {
            return await _basket.DeleteBasketAsync(id);
        }
    }
}
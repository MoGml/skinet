using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _product;

        public ProductsController(IProductRepository product)
        {
            _product = product;
        }


        /// <summary>
        /// Get List of Products
        /// </summary>
        /// <returns>List of Products</returns>
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _product.GetProductsAsync();

            return Ok(products);
        }


        /// <summary>
        /// Get Product Details by Passing Product Id as Query
        /// </summary>
        /// <param name="id">Product Id</param>
        /// <returns>Product Details</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _product.GetProductAsync(id);

            if (product == null)
            {
                return NotFound("Product is not Found");
            }

            return Ok(product);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            var brands = await _product.GetProductBrandsAsync();

            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetTypes()
        {
            var types = await _product.GetProductTypesAsync();

            return Ok(types);
        }
    }
}
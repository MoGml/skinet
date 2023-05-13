using Core.Entities;
using Core.Interfaces;
using Core.Specification;
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
        private readonly IGenericRepository<Product> _productRepo;

        private readonly IGenericRepository<ProductBrand> _brandRepo;

        private readonly IGenericRepository<ProductType> _typeRepo;
        //private readonly IProductRepository _product;

        public ProductsController( /*IProductRepository product*/ IGenericRepository<Product> productRepo,
            IGenericRepository<ProductBrand> brandRepo, IGenericRepository<ProductType> typeRepo)
        {
            _productRepo = productRepo;
            _brandRepo = brandRepo;
            _typeRepo = typeRepo;
            //_product = product;
        }


        /// <summary>
        /// Get List of Products
        /// </summary>
        /// <returns>List of Products</returns>
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var spec = new ProductWithTypeAndBrandSpecification();

            var products = await _productRepo.GetAllWithSpecAsync(spec);

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
            var spec = new ProductWithTypeAndBrandSpecification(id);

            var product = await _productRepo.GetWithSpecAsync(spec);

            if (product == null)
            {
                return NotFound("Product is not Found");
            }

            return Ok(product);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            var brands = await _brandRepo.GetListAsync();

            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetTypes()
        {
            var types = await _typeRepo.GetListAsync();

            return Ok(types);
        }
    }
}
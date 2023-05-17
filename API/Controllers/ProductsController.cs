using API.Dtos;
using API.Error;
using API.Helpers;
using AutoMapper;
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
    public class ProductsController : BaseController
    {
        private readonly IGenericRepository<Product> _productRepo;

        private readonly IGenericRepository<ProductBrand> _brandRepo;

        private readonly IGenericRepository<ProductType> _typeRepo;

        private readonly IMapper _map;

        public ProductsController(IGenericRepository<Product> productRepo,
            IGenericRepository<ProductBrand> brandRepo, IGenericRepository<ProductType> typeRepo, IMapper map)
        {
            _productRepo = productRepo;
            _brandRepo = brandRepo;
            _typeRepo = typeRepo;
            _map = map;
        }


        /// <summary>
        /// Get List of Products
        /// </summary>
        /// <returns>List of Products</returns>
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductReturnDto>>> GeProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductWithTypeAndBrandSpecification(productParams);

            var specCount = new ProductWithFiltersToCountSpecification(productParams);

            var products = await _productRepo.GetAllWithSpecAsync(spec);

            var productsDto = _map.Map<IReadOnlyList<Product>, IReadOnlyList<ProductReturnDto>>(products);

            var count = await _productRepo.Count(specCount);

            return Ok(new Pagination<ProductReturnDto>(productParams.PageSize, productParams.PageIndex, count,
                productsDto));
        }


        /// <summary>
        /// Get Product Details by Passing Product Id as Query
        /// </summary>
        /// <param name="id">Product Id</param>
        /// <returns>Product Details</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithTypeAndBrandSpecification(id);

            var product = await _productRepo.GetWithSpecAsync(spec);

            if (product == null)
            {
                return NotFound(new ApiResponse(404, "Product is not Found"));
            }

            return Ok(_map.Map<Product, ProductReturnDto>(product));
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
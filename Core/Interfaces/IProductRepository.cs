using Core.Entities;

namespace Core.Interfaces;

public interface IProductRepository
{
    Task<Product> GetProductAsync(int productId);
    Task<IReadOnlyList<Product>> GetProductsAsync();
    Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
    Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
}
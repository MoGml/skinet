using Core.Entities;

namespace Core.Specification
{
    public class ProductWithTypeAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductWithTypeAndBrandSpecification(ProductSpecParams productParams)
            : base(x =>
                (string.IsNullOrEmpty(productParams.SearchTerm) ||
                 x.Name.ToLower().Contains(productParams.SearchTerm)) &&
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
            AddPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            // Sorting
            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;

                    case "priceDes":
                        AddOrderByDesc(p => p.Price);
                        break;

                    case "z-a":
                        AddOrderByDesc(p => p.Name);
                        break;

                    default:
                        AddOrderBy(p => p.Name);
                        break;
                }
            }

            // Pagination
        }

        public ProductWithTypeAndBrandSpecification(int id)
            : base(p => p.Id == id)
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }
    }
}
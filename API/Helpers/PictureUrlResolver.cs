using API.Dtos;
using AutoMapper;
using AutoMapper.Execution;
using Core.Entities;

namespace API.Helpers
{
    public class PictureUrlResolver : IValueResolver<Product, ProductReturnDto, string>
    {
        private readonly IConfiguration _config;

        public PictureUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductReturnDto destination, string destMember,
            ResolutionContext context)
        {
            if (source.PictureUrl != null)
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}
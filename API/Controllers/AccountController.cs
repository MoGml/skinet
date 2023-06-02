using System.Security.Claims;
using API.Dtos;
using API.Error;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }


        [Authorize]
        [HttpGet("GetCurrentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            var user = await _userManager.FindByEmailAsync(email);

            return Ok(new UserDto()
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(SigninDto signinDto)
        {
            var user = await _userManager.FindByEmailAsync(signinDto.Email);

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401));
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, signinDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized(new ApiResponse(401));
            }

            return new UserDto()
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterAccount(RegisterDto registerDto)
        {
            //if (await isExist(registerDto.Email))
            //{
            //    return BadRequest(new ApiResponse(400, "Email already |Exist"));
            //}

            var user = await _userManager.FindByEmailAsync(registerDto.Email);

            if (user != null)
            {
                return Unauthorized(new ApiResponse(401, "Email Exists"));
            }

            var newUser = new AppUser()
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                DisplayName = registerDto.DisplayName,
                AccessFailedCount = 1000,
            };


            var result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!result.Succeeded)
            {
                return Unauthorized(result);
            }

            return Ok(new UserDto()
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                Token = _tokenService.CreateToken(newUser)
            });
        }


        [Authorize]
        [HttpPut("updateAddress")]
        public async Task<ActionResult<AddressDto>> updateAddress(AddressDto addressDto)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            var user = await _userManager.Users.Include(a => a.Address).SingleOrDefaultAsync(e => e.Email == email);

            //address.FirstName = addressDto.FirstName;
            //address.LastName = addressDto.LastName;
            //address.State=addressDto.State;
            //address.City = addressDto.City;
            //address.ZipCode = addressDto.ZipCode;
            //address.Street = addressDto.Street;

            user.Address = _mapper.Map<AddressDto, Address>(addressDto);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return _mapper.Map<AddressDto>(user.Address);

            return BadRequest("Problem had during updating");
        }


        [HttpGet("isExist")]
        public async Task<ActionResult<bool>> isExist([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);


            if (user == null) return false;

            return true;
        }


        [Authorize]
        [HttpGet("userAddress")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            //var user = await _userManager.FindByEmailAsync(email);

            //var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

            var user = await _userManager.Users.Include(a => a.Address).SingleOrDefaultAsync(e => e.Email == email);

            var address = _mapper.Map<AddressDto>(user.Address);

            return address;
        }

        //public async Task<ActionResult> Logout(){}
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public static class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser()
                {
                    DisplayName = "Mostafa AlGamal",
                    Email = "m.hassan.algamal@gmail.com",
                    UserName = "m.hassan.algamal@gmail.com",
                    Address = new Address()
                    {
                        FirstName = "Mostafa",
                        LastName = "AlGamal",
                        City = "Cairo",
                        State = "Cairo",
                        ZipCode = "11341",
                    }
                };

                await userManager.CreateAsync(user, "P@ssw0rd");
            }
        }
    }
}
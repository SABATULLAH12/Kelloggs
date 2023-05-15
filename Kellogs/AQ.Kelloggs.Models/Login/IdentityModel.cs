/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2013 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using AQ.Kelloggs.Models;
using System;

namespace AQ.Kelloggs.Models.Login
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {        
        public string Department { get; set; }
        public string BusinessUnit { get; set; }
        public DateTime? LastActivityDate { get; set; }
        public override string UserName { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public override string Email { get; set; }
        public string Country { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser, string> manager)
        {
            if (manager != null)
            {
                // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
                var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie).ConfigureAwait(true);
                // Add custom user claims here
                return userIdentity;
            }
            else
            {
                return new ClaimsIdentity();
            }
        }
    }

    public class ApplicationRole :IdentityRole
    {
        public string Modules { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("Con_Dev", throwIfV1Schema: false)
        {
            // Method intentionally left empty.
        }



        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }


}

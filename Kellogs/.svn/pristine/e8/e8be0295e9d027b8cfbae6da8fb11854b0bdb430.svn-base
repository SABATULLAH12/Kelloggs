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

namespace AQ.Kelloggs.Models.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        const string AspNetRoles = "dbo.AspNetRoles";
        const string AspNetUserRoles = "dbo.AspNetUserRoles";
        const string AspNetUsers = "dbo.AspNetUsers";
        const string AspNetUserClaims = "dbo.AspNetUserClaims";
        const string AspNetUserLogins = "dbo.AspNetUserLogins";
        public override void Up()
        {
            CreateTable(
                AspNetRoles,
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                        Name = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.twofiftysix),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                AspNetUserRoles,
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                        RoleId = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey(AspNetRoles, t => t.RoleId, cascadeDelete: true)
                .ForeignKey(AspNetRoles, t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                AspNetUsers,
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                        Email = c.String(maxLength: (int)Constants.MagicNumbers.twofiftysix),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.twofiftysix),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                AspNetUserClaims,
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey(AspNetUsers, t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                AspNetUserLogins,
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                        ProviderKey = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                        UserId = c.String(nullable: false, maxLength: (int)Constants.MagicNumbers.onetwentyeight),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey(AspNetUsers, t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey(AspNetUserRoles, Constants.UserId, AspNetUsers);
            DropForeignKey(AspNetUserLogins, Constants.UserId, AspNetUsers);
            DropForeignKey(AspNetUserClaims, Constants.UserId, AspNetUsers);
            DropForeignKey(AspNetUserRoles, "RoleId", AspNetRoles);
            DropIndex(AspNetUserLogins, new[] { Constants.UserId });
            DropIndex(AspNetUserClaims, new[] { Constants.UserId });
            DropIndex(AspNetUsers, "UserNameIndex");
            DropIndex(AspNetUserRoles, new[] { "RoleId" });
            DropIndex(AspNetUserRoles, new[] { Constants.UserId });
            DropIndex(AspNetRoles, "RoleNameIndex");
            DropTable(AspNetUserLogins);
            DropTable(AspNetUserClaims);
            DropTable(AspNetUsers);
            DropTable(AspNetUserRoles);
            DropTable(AspNetRoles);
        }
    }
}

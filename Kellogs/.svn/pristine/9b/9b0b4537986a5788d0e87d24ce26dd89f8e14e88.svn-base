using AQ.Kelloggs.Models.Login;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Identity.Client;
using Microsoft.Owin.Security.OAuth;
using System.Web;
using System.Data.Entity;
using System.Configuration;
using Microsoft.Graph;
using Microsoft.Graph.Auth;
using System.Threading;
using System.Collections.Generic;
using System;

namespace AQ.Kelloggs.UI.App_Start
{
    // Configure the RoleManager used in the application. RoleManager is defined in the ASP.NET Identity core assembly
    public class ApplicationRoleManager : RoleManager<ApplicationRole>
    {
        public ApplicationRoleManager(IRoleStore<ApplicationRole, string> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            return new ApplicationRoleManager(new RoleStore<ApplicationRole>(context.Get<ApplicationDbContext>()));
        }
    }

    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }

            return manager;
        }



    }
    // Configure the application sign-in manager which is used in this application.
    public class ApplicationSignInManager : SignInManager<ApplicationUser, string>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }

        //public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        //{
        //    return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager, OAuthDefaults.AuthenticationType);
        //}

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }

    }

    public static class SdkHelper
    {
        // Properties used to get and manage an access token.
        private static string redirectUri = ConfigurationManager.AppSettings["ida:RedirectUri"];
        private static string appId = ConfigurationManager.AppSettings["ida:AppId"];
        private static string appSecret = ConfigurationManager.AppSettings["ida:AppSecret"];
        private static string nonAdminScopes = ConfigurationManager.AppSettings["ida:NonAdminScopes"];
        private static string adminScopes = ConfigurationManager.AppSettings["ida:AdminScopes"];

        // Get an authenticated Microsoft Graph Service client.
        public static GraphServiceClient AuthenticatedClient
        {
            get
            {
                if (redirectUri[redirectUri.Length - 1] != '/')
                { redirectUri = redirectUri + "/"; }
                bool? isAdmin = HttpContext.Current.Session["IsAdmin"] as bool?;
                string allScopes = nonAdminScopes;
                if (isAdmin.GetValueOrDefault())
                {
                    allScopes += " " + adminScopes;
                }
                string[] scopes = allScopes.Split(new[] { ' ' });

                HttpContextBase context = HttpContext.Current.GetOwinContext().Environment["System.Web.HttpContextBase"] as HttpContextBase;
                SessionTokenCacheProvider sessionTokenCacheProvider = new SessionTokenCacheProvider(context);

                IConfidentialClientApplication cca = AuthorizationCodeProvider.CreateClientApplication(appId, redirectUri, new ClientCredential(appSecret), sessionTokenCacheProvider);

                return new GraphServiceClient(new AuthorizationCodeProvider(cca, scopes));
            }
        }
    }

    // Store the user's token information.
    // Store the user's token information.
    public class SessionTokenCacheProvider : ITokenStorageProvider
    {
        private static ReaderWriterLockSlim SessionLock = new ReaderWriterLockSlim(LockRecursionPolicy.NoRecursion);
        readonly HttpContextBase httpContext = null;

        public SessionTokenCacheProvider(HttpContextBase httpcontext)
        {
            httpContext = httpcontext;
        }

        public Task SetTokenCacheAsync(string cacheId, byte[] tokenCache)
        {
            SessionLock.EnterWriteLock();
            // Reflect changes in the persistent store
            httpContext.Session[cacheId] = tokenCache;
            SessionLock.ExitWriteLock();

            return Task.FromResult<object>(null);
        }

        public Task<byte[]> GetTokenCacheAsync(string cacheId)
        {
            byte[] tokenCache = null;
            SessionLock.EnterReadLock();
            tokenCache = httpContext.Session[cacheId] as byte[];
            SessionLock.ExitReadLock();

            return Task.FromResult(tokenCache);
        }
    }    
}

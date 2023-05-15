using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(AQ.Kelloggs.UI.Startup))]

namespace AQ.Kelloggs.UI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
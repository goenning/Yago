using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Yago.Test.Helper
{
    public class StaticServerStartup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                string[] files = new string[] {
                    $"Assets/{context.Request.Host}{context.Request.Path}",
                    $"test/Yago.Test/Assets/{context.Request.Host}{context.Request.Path}"
                };
                
                foreach(var file in files)
                {
                    if (File.Exists(file))
                    {
                        string content = File.ReadAllText(file);
                        await context.Response.WriteAsync(content);
                        break;
                    }
                }

                await next.Invoke();
            });

            app.Run(async (context) =>
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync("Not Found");
            });
        }
    }
}

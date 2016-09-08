using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Net.Http;

namespace Yago.Test.Helper
{
    public abstract class StaticServerBaseTest : IDisposable
    {
        private IWebHostBuilder webHostBuilder;
        private TestServer host;
        protected HttpClient client;

        public StaticServerBaseTest()
        {
            this.webHostBuilder = new WebHostBuilder().UseStartup<StaticServerStartup>();
            this.host = new TestServer(this.webHostBuilder);
            this.client = host.CreateClient();
        }

        public void Dispose()
        {
            this.host.Dispose();
        }
    }
}

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Net.Http;
using Yago.Test.Assets;

namespace Yago.Test.Helper
{
    public abstract class YagoBaseTest : IDisposable
    {
        private IWebHostBuilder webHostBuilder;
        private TestServer host;
        protected HttpClient client;

        public YagoBaseTest()
        {
            this.webHostBuilder = new WebHostBuilder().UseStartup<StaticServerStartup>();
            this.host = new TestServer(this.webHostBuilder);
            this.client = host.CreateClient();
        }

        protected YagoClient CreateYago()
        {
            var configuration = new YagoConfiguration();
            configuration.HttpClient = this.client;

            return new YagoClient(configuration);
        }

        public void Dispose()
        {
            this.host.Dispose();
        }
    }
}

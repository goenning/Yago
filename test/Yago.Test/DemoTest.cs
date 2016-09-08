using System.Net;
using System.Net.Http;
using Xunit;
using Yago.Test.Helper;

namespace Yago.Test
{
    public class DemoTest : StaticServerBaseTest
    {
        [Fact]
        public async void GetIndexTest()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "http://www.yagohost.com/index.html");
            var response = await this.client.SendAsync(request);
            Assert.Equal("Hello World", await response.Content.ReadAsStringAsync());
        }

        [Fact]
        public async void NotFoundTest()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "http://www.yagohost.com/notfound.html");
            var response = await this.client.SendAsync(request);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
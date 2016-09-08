using System.Net;
using System.Net.Http;
using Xunit;
using Yago.Test.Helper;

namespace Yago.Test
{
    public class DemoTest : YagoBaseTest
    {
        [Fact]
        public async void GetIndexTest()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "http://www.yagohost.com/index.html");
            var response = await this.client.SendAsync(request);
            Assert.Equal("Hello World", await response.Content.ReadAsStringAsync());
        }

        [Theory]
        [InlineData("http://www.yagohost.com/notfound.html")]
        [InlineData("http://www.thissiteisnonsense.com/")]
        public async void NotFoundTest(string url)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            var response = await this.client.SendAsync(request);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
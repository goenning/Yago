using Xunit;
using Yago.Test.Helper;

namespace Yago.Test
{
    public class ScraperTest : StaticServerBaseTest
    {
        [Fact]
        public async void ParseProductTest()
        {
            var configuration = new CrawlerConfiguration();
            configuration.HttpClient = this.client;

            var crawler = new DefaultCrawler(configuration);
            crawler.AddParser(new ProductParser());
            crawler.OnParserExecuted += (parser, result) => 
            {
                Assert.IsType(typeof(Product), result);
                Assert.Equal("MacBook Pro", (result as Product).Title);
            };
            await crawler.Start("http://www.yagohost.com/products/macbook-pro.html");
        }
    }
}

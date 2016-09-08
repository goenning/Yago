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
                var product = result as Product;
                Assert.NotNull(product);
                Assert.Equal("MacBook Pro", product.Title);
                Assert.Equal(1099.99m, product.Price);
                Assert.Equal(1399.99m, product.RegularPrice);
            };
            await crawler.Start("http://www.yagohost.com/products/macbook-pro.html");
        }
    }
}

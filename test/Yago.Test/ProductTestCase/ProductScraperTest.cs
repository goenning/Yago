using Xunit;
using Yago.Test.Helper;

namespace Yago.Test.ProductTestCase
{
    public class ProductScraperTest : StaticServerBaseTest
    {
        [Fact]
        public async void ParseSimpleProductTest()
        {
            var configuration = new YagoConfiguration();
            configuration.HttpClient = this.client;

            var yago = new YagoClient(configuration);
            yago.AddParser(new ProductParser());
            yago.OnPageParsed += (parser, result) => 
            {
                var product = result as Product;
                Assert.NotNull(product);
                Assert.Equal("MacBook Pro", product.Title);
                Assert.Equal(1099.99m, product.Price);
                Assert.Equal(1399.99m, product.RegularPrice);
            };
            await yago.Start("http://www.yagohost.com/products/macbook-pro.html");
        }
    }
}

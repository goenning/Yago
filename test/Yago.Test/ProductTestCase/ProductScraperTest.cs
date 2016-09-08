using System.Collections.Generic;
using Xunit;
using Yago.Test.Helper;

namespace Yago.Test.ProductTestCase
{
    public class ProductScraperTest : YagoBaseTest
    {
        [Fact]
        public async void ParseSimpleProductTest()
        {
            Product product = null;
            var yago = this.CreateYago();
            yago.Use(new ProductParser());
            yago.OnPageParsed += (parser, result) => product = result as Product;

            await yago.Start("http://www.yagohost.com/products/macbook-pro.html");

            Assert.NotNull(product);
            Assert.Equal("MacBook Pro", product.Title);
            Assert.Equal(1099.99m, product.Price);
            Assert.Equal(1399.99m, product.RegularPrice);
        }
        
        [Fact]
        public async void ShouldIgnoreNonProductPagesTest()
        {
            var count = 0;
            var yago = this.CreateYago();
            yago.Use(new ProductParser());
            yago.OnPageParsed += (parser, result) => count++;
            
            await yago.Start("http://www.yagohost.com/index.html");

            Assert.Equal(0, count);
        }
        
        [Fact]
        public async void ParseTwoProductsTest()
        {
            var products = new List<Product>();
            var yago = this.CreateYago();
            yago.Use(new ProductParser());
            yago.OnPageParsed += (parser, result) => products.Add(result as Product);

            await yago.Start(
                "http://www.yagohost.com/products/macbook-pro.html",
                "http://www.yagohost.com/products/iphone.html" 
            );

            Assert.Equal(2, products.Count);
            
            Assert.Equal("MacBook Pro", products[0].Title);
            Assert.Equal(1099.99m, products[0].Price);
            Assert.Equal(1399.99m, products[0].RegularPrice);

            Assert.Equal("iPhone", products[1].Title);
            Assert.Equal(600, products[1].Price);
            Assert.Equal(0, products[1].RegularPrice);
        }
    }
}

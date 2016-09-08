using System;
using AngleSharp.Dom.Html;

namespace Yago.Test.ProductTestCase
{
    public class ProductParser : IPageParser
    {
        public object Parse(IHtmlDocument document)
        {
            var details = document.QuerySelector("#product-details");
            var title = details.QuerySelector(".title").TextContent;

            var current = details.QuerySelector(".price");
            var regular = details.QuerySelector(".regular-price");

            var currentPrice = Convert.ToDecimal(current?.TextContent ?? "0");
            var regularPrice = Convert.ToDecimal(regular?.TextContent ?? "0");

            return new Product(title, currentPrice, regularPrice);
        }

        public bool ShouldParse(string url, IHtmlDocument document)
        {
            return url.Contains("/products/");
        }
    }
}
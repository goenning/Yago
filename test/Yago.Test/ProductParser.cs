using System;
using AngleSharp.Dom.Html;

namespace Yago.Test
{
    public class ProductParser : IPageParser
    {
        public object Parse(IHtmlDocument content)
        {
            var details = content.QuerySelector("#product-details");
            var title = details.QuerySelector(".title").TextContent;
            var regular = Convert.ToDecimal(details.QuerySelector(".regular-price").TextContent);
            var current = Convert.ToDecimal(details.QuerySelector(".discount-price").TextContent);
            return new Product(title, regular, current);
        }

        public bool ShouldParse()
        {
            return true;
        }
    }
}
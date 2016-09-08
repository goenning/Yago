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
            var current = Convert.ToDecimal(details.QuerySelector(".price").TextContent);
            var regular = Convert.ToDecimal(details.QuerySelector(".regular-price").TextContent);
            return new Product(title, current, regular);
        }

        public bool ShouldParse()
        {
            return true;
        }
    }
}
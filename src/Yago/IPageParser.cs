using AngleSharp.Dom.Html;

namespace Yago
{
    public interface IPageParser
    {
        bool ShouldParse(string url, IHtmlDocument document);
        object Parse(IHtmlDocument document);
    }
}

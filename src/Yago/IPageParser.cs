using AngleSharp.Dom.Html;

namespace Yago
{
    public interface IPageParser
    {
        bool ShouldParse();
        object Parse(IHtmlDocument content);
    }
}

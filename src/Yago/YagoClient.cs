using AngleSharp.Parser.Html;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Yago
{
    public delegate void PageParsedDelegate(IPageParser parser, object result);

    public class YagoClient
    {
        private YagoConfiguration configuration;
        private IList<IPageParser> parsers;

        public event PageParsedDelegate OnPageParsed;

        public YagoClient()
            : this(new YagoConfiguration())
        {
        }

        public YagoClient(YagoConfiguration configuration)
        {
            this.configuration = configuration;
            this.parsers = new List<IPageParser>();
        }

        public async Task Start(string startUrl)
        {
            var message = new HttpRequestMessage(HttpMethod.Get, startUrl);
            var response = await this.configuration.HttpClient.SendAsync(message);
            var content = await response.Content.ReadAsStringAsync();
            var parser = new HtmlParser();
            var document = parser.Parse(content);

            foreach (var pageParser in this.parsers)
            {
                if (pageParser.ShouldParse())
                {
                    var result = pageParser.Parse(document);
                    this.OnPageParsed?.Invoke(pageParser, result);
                }
            }
        }

        public void AddParser(IPageParser parser)
        {
            this.parsers.Add(parser);
        }
    }
}

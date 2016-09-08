using AngleSharp.Parser.Html;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Yago
{
    public delegate void ParserExecutedDelegate(IPageParser parser, object result);

    public class DefaultCrawler
    {
        private CrawlerConfiguration configuration;
        private IList<IPageParser> parsers;

        public event ParserExecutedDelegate OnParserExecuted;

        public DefaultCrawler()
            : this(new CrawlerConfiguration())
        {
        }

        public DefaultCrawler(CrawlerConfiguration configuration)
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
                    this.OnParserExecuted?.Invoke(pageParser, result);
                }
            }
        }

        public void AddParser(IPageParser parser)
        {
            this.parsers.Add(parser);
        }
    }
}

using AngleSharp.Parser.Html;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System;

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

        public async Task Start(params string[] urls)
        {
            var parser = new HtmlParser();
            foreach(var url in urls)
            {
                var message = new HttpRequestMessage(HttpMethod.Get, url);
                var response = await this.configuration.HttpClient.SendAsync(message);
                var content = await response.Content.ReadAsStringAsync();
                var document = parser.Parse(content);

                foreach (var pageParser in this.parsers)
                {
                    if (pageParser.ShouldParse(url, document))
                    {
                        var result = pageParser.Parse(document);
                        this.OnPageParsed?.Invoke(pageParser, result);
                    }
                }
            }
        }

        public void Use(IPageParser parser)
        {
            this.parsers.Add(parser);
        }
    }
}

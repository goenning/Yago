using System.Net.Http;

namespace Yago
{
    public class CrawlerConfiguration
    {
        public HttpClient HttpClient { get; set; }

        public CrawlerConfiguration()
        {
            this.HttpClient = new HttpClient();
        }
    }
}

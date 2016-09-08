using System.Net.Http;

namespace Yago
{
    public class YagoConfiguration
    {
        public HttpClient HttpClient { get; set; }

        public YagoConfiguration()
        {
            this.HttpClient = new HttpClient();
        }
    }
}

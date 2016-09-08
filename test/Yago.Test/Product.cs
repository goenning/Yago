namespace Yago.Test
{
    public class Product
    {
        public Product(string title, decimal regular, decimal current)
        {
            Title = title;
            this.RegularPrice = regular;
            this.CurrentPrice = current;
        }

        public string Title { get; private set; }
        public decimal CurrentPrice { get; private set; }
        public decimal RegularPrice { get; private set; }
    }
}
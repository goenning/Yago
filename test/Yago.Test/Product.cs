namespace Yago.Test
{
    public class Product
    {
        public Product(string title, decimal price, decimal regularPrice)
        {
            Title = title;
            this.Price = price;
            this.RegularPrice = regularPrice;
        }

        public string Title { get; private set; }
        public decimal Price { get; private set; }
        public decimal RegularPrice { get; private set; }
    }
}
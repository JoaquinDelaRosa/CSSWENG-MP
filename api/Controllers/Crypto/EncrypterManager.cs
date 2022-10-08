
namespace api.Controllers.Crypto
{
    public class EncrypterManager
    {
        private readonly CryptoStrategy strategy;
        public EncrypterManager(CryptoStrategy strategy)
        {
            this.strategy = strategy;
        }

        public bool IsEqual(string x, string y)
        {
            return strategy.IsEqual(x, y);
        }

        public string Encrypt(string s)
        {
            return strategy.Encrypt(s);
        }
    }
}

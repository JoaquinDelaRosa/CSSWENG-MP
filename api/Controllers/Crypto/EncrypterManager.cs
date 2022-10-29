
namespace api.Controllers.Crypto
{
    public class EncrypterManager
    {
        private readonly CryptoStrategy strategy;
        public EncrypterManager(CryptoStrategy strategy)
        {
            this.strategy = strategy;
        }

        public bool IsEqual(string unecrypted, string encrypted)
        {
            return strategy.IsEqual(unecrypted, encrypted);
        }

        public string Encrypt(string s)
        {
            return strategy.Encrypt(s);
        }
    }
}

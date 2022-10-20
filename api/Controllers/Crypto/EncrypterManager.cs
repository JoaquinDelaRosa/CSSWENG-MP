
namespace api.Controllers.Crypto
{
    // Defines a controller endpoint that implements an encrpytion strategy for encrypting a text. Used for hashing the passwords
    // before storing it in the DB.
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

namespace api.Controllers.Crypto
{
    public abstract class CryptoStrategy
    {
        public abstract string Encrypt(string plainText);
        public abstract bool IsEqual(string x, string y);
    }
}

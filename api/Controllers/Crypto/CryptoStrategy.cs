namespace api.Controllers.Crypto
{
    // Defines an interface for classes that can perform an encrpytion algorithm on plaintext. Used as part of the strategy design 
    // pattern
    public abstract class CryptoStrategy
    {
        public abstract string Encrypt(string plainText);
        public abstract bool IsEqual(string x, string y);
    }
}

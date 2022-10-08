using System.Security.Cryptography;
using System.Text;

namespace api.Controllers.Crypto
{
    public class SHA : CryptoStrategy
    {
        public override string Encrypt(string plainText)
        {
            byte[] encrypted = SHA512.HashData(Encoding.UTF8.GetBytes(plainText));
            return Encoding.UTF8.GetString(encrypted);
        }

        public override bool IsEqual(string x, string y)
        {
            return Encrypt(x) == Encrypt(y);
        }
    }
}

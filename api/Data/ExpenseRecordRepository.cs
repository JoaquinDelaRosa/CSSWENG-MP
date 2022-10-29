using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ExpenseRecordRepository : Repository<ExpenseRecord>
    {
        public ExpenseRecordRepository(DbContext context) : base(context)
        {

        }
    }
}

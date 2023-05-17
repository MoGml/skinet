using System.Linq.Expressions;

namespace Core.Specification;

public interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; }

    List<Expression<Func<T, object>>> Includes { get; }
    Expression<Func<T, object>> OrderBy { get; }
    Expression<Func<T, object>> OrderByDesc { get; }

    int Skip { get; }
    int Take { get; }
    bool IsPagingEnabled { get; }
}
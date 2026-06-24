using System;
using System.Linq.Expressions;
namespace HRMS.Core.Postgres.Extensions
{
    public static class ExpressionExtensions
    {
        public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> expr1, Expression<Func<T, bool>> expr2)
        {
            var parameter = Expression.Parameter(typeof(T));
            var combined = new ReplaceParameterVisitor(expr1.Parameters[0], parameter).Visit(expr1.Body);
            var second = new ReplaceParameterVisitor(expr2.Parameters[0], parameter).Visit(expr2.Body);
            return Expression.Lambda<Func<T, bool>>(Expression.AndAlso(combined, second), parameter);
        }

        private class ReplaceParameterVisitor : ExpressionVisitor
        {
            private readonly ParameterExpression _oldParameter;
            private readonly ParameterExpression _newParameter;

            public ReplaceParameterVisitor(ParameterExpression oldParameter, ParameterExpression newParameter)
            {
                _oldParameter = oldParameter;
                _newParameter = newParameter;
            }

            protected override Expression VisitParameter(ParameterExpression node)
            {
                return node == _oldParameter ? _newParameter : base.VisitParameter(node);
            }
        }
    }
}

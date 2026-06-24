using System;
using System.Collections.Generic;

namespace HRMS.Shared.Application.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class AuthorizeRoleAttribute : Attribute
    {
        public UserRole[] Roles { get; }
        public AuthorizeRoleAttribute(params UserRole[] roles)
        {
            Roles = roles;
        }
    }
}

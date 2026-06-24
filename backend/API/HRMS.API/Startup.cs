using HRMS.API.Extensions;
using HRMS.API.Middleware;
using HRMS.Core.Postgres.Data;
using HRMS.Shared.Application.Extensions;
using HRMS.Shared.Application.GraphQL;
using HRMS.Shared.Infrastructure.Extensions;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using System.Text.Json.Serialization;
using TodoFeature.Application.DTO;
using DocumentsFeature.Application.DTO;
using PayrollFeature.Application.DTO;
using ExpensesFeature.Application.DTO;
using TeamFeature.Application.DTO;
using AnnouncementsFeature.Application.DTO;

namespace HRMS.API
{
    public class NoCacheFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (!context.HttpContext.WebSockets.IsWebSocketRequest)
            {
                context.HttpContext.Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0";
                context.HttpContext.Response.Headers["Pragma"] = "no-cache";
                context.HttpContext.Response.Headers["Expires"] = "-1";
            }
        }
        public void OnActionExecuting(ActionExecutingContext context) { }
    }

    public class Startup
    {
        public void Configure(WebApplication app, IWebHostEnvironment env, IConfiguration configuration)
        {
            app.UseForwardedHeaders();
            //app.UseStaticFiles();
            
            _ = Task.Run(() =>
            {
                try { app.EnsurePostgresDbIsCreated(); }
                catch { }
            });

            app.UseRouting();
            app.UseRequestTimeouts();
            app.UseCors();
            app.AddMiddleware();
            app.UseAuthentication();
            app.UseAuthorization();

            bool enableGraphQLTool = configuration.GetValue<bool>("GraphQL:Tool:Enable", env.IsDevelopment());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGraphQL("/").WithOptions(new HotChocolate.AspNetCore.GraphQLServerOptions
                {
                    Tool = { Enable = enableGraphQLTool }
                });
            });
        }

        public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                options.KnownProxies.Add(IPAddress.Parse("10.0.0.1"));
            });

            services.AddControllers()
                   .AddJsonOptions(options =>
                   {
                       options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                   });

            services.AddEndpointsApiExplorer();
            services.AddHttpClient();
            
            services.AddInjectionApplication(configuration, [
                typeof(CreateTodoHandler).Assembly,
                typeof(CreateDocumentHandler).Assembly,
                typeof(CreatePayrollHandler).Assembly,
                typeof(CreateExpenseHandler).Assembly,
                typeof(CreateTeamMemberHandler).Assembly,
                typeof(CreateAnnouncementHandler).Assembly
            ]);

            services.AddInjectionPostgres(configuration);
            services.AddModulesDependencyInjection(configuration);
            services.ConfigureApiBehavior();
            services.ConfigureCorsPolicy(configuration);
            services.ConfigureGraphQL(configuration);
            services.AddMemoryCache();
            services.AddMvc(options => { options.Filters.Add(new NoCacheFilter()); });
        }
    }
}

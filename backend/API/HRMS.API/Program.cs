using HRMS.API;
using HRMS.Core.KeyVault.Extensions;
using Microsoft.AspNetCore.Http.Timeouts;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

int requestTimeoutSeconds = builder.Configuration.GetValue<int>("RequestTimeout:Seconds", 90);
builder.Services.AddRequestTimeouts(options =>
{
    options.DefaultPolicy = new RequestTimeoutPolicy
    {
        Timeout = TimeSpan.FromSeconds(requestTimeoutSeconds),
        TimeoutStatusCode = StatusCodes.Status504GatewayTimeout
    };
});

builder.Services.AddHttpContextAccessor();
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 105 * 1024 * 1024;
});

var startup = new Startup();
startup.ConfigureServices(builder.Services, builder.Configuration);
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

startup.Configure(app, app.Environment, builder.Configuration);
app.Run();

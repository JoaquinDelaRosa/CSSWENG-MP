using api.Models;
using api.Models.Seeds;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();

var Key = builder.Configuration.GetValue<string>("Jwt:Key");
var Issuer = builder.Configuration.GetValue<string>("Jwt:Issuer");
var Audience = builder.Configuration.GetValue<string>("Jwt:Audience");

builder.Services.AddDbContext<AutoworksDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AutoWorksConnection") ?? throw new InvalidOperationException("Connection string not found")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var securitySchema = new OpenApiSecurityScheme
    {
        Description = "Using the Authorization header with the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };

    c.AddSecurityDefinition("Bearer", securitySchema);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
          {
              { securitySchema, new[] { "Bearer" } }
          });
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Issuer,
        ValidAudience = Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key))
    };
});


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://toptechautoworks.com").AllowAnyHeader().AllowAnyMethod();
        });
    
    options.AddPolicy("LocalPolicy", 
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        }
    );
});


var app = builder.Build();
var config = app.Configuration;

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    CustomerTypeDbSeed.Initialize(services);
    OrderStatusDbSeed.Initialize(services);

    InvoiceDbSeed.Initialize(services);
    UserDbSeed.Initialize(services);
    VehicelDbSeed.Initialize(services);
    CustomeDbSeed.Initialize(services);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseCors("LocalPolicy");


app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "Hello World!");

app.Run();



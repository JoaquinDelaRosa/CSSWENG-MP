using api.Data;
using api.Models;
using api.Models.Seeds;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var app = builder.Build();
var config = app.Configuration;

builder.Services.AddControllers();
builder.Services.AddDbContext<AutoworksDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AutoWorksConnection") ?? throw new InvalidOperationException("Connection string not found")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = config["Jwt:Issuer"],
        ValidAudience = config["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]))
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

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    CustomerTypeDbSeed.Initialize(services);
    CustomerDbSeed.Initialize(services);
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

app.Run();

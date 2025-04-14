using ZooApi.Data;
using Microsoft.EntityFrameworkCore;

using ZooApi.Services;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

// builder.Services.AddDbContext<ZooContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// builder.Services.AddDbContext<ZooContext>(options =>
//     options.UseSqlite("Data Source=zoo.db")); // Use InMemory database for testing

// System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
builder.Services.AddDbContext<ZooContext>(options =>
    options.UseSqlServer("Server=localhost,1433;Database=ZooDb;User Id=sa;Password=YourStrong@Password123;TrustServerCertificate=true;"));

builder.Services.AddScoped<AnimalService>();
builder.Services.AddScoped<CareService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("*") // your frontend origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors();

app.Run();

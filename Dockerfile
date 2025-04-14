# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project and restore dependencies
COPY ["ZooApi/ZooApi.csproj", "ZooApi/"]
RUN dotnet restore "ZooApi/ZooApi.csproj"

# Copy the full source and publish
COPY . .
WORKDIR "/src/ZooApi"
RUN dotnet publish "ZooApi.csproj" -c Release -o /app/publish

# Final stage (also using SDK for CLI access)
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS final
WORKDIR /app

# Copy the published app
#COPY --from=build /app/publish .
COPY . .

# Copy and set up entrypoint
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose the port your app listens on
EXPOSE 5000

# Start the app
ENTRYPOINT ["./entrypoint.sh"]


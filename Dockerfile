# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5000

# Stage 2: Publish the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ZooApi/ZooApi.csproj", "ZooApi/"]
RUN dotnet restore "ZooApi/ZooApi.csproj"
COPY . .
WORKDIR "/src/ZooApi"
RUN dotnet publish "ZooApi.csproj" -c Release -o /app/publish

# Stage 3: Copy the built app to the base image and run it
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ZooApi.dll"]

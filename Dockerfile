# frontend/Dockerfile
FROM node:18-alpine AS build
WORKDIR /zoo-animal-manager-system

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine AS nginx
COPY --from=final /usr/share/nginx/html /usr/share/nginx/html
EXPOSE 80


# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000

# Stage 2: Publish the application
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
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
#ENTRYPOINT ["dotnet", "ZooApi.dll"]

#ENTRYPOINT ["dotnet", "ZooApi"]

ENTRYPOINT ["dotnet", "ZooApi.dll"]

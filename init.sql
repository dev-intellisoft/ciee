IF EXISTS (SELECT name FROM sys.databases WHERE name = N'ZooDb')
BEGIN
    ALTER DATABASE [ZooDb] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [ZooDb];
END;

CREATE DATABASE [ZooDb];

﻿Game of Drones - Simulation Game
Rock, Paper, Scissors

ASP.NET Core + ReactJS Template

PRE-REQUISITES
--------------------------------
- Microsoft Visual Studio 15.9.6 or higher.
- ASP.NET Core SDK 2.2.
- NPM (Node Package Manager) 3 or higher -properly configured to download packages.

INSTRUCTIONS
--------------------------------
- Open the solution with Visual Studio.
- From the Package Manager Console (Tools > Nuget Package Manager > Package Manager Console), run the command <code>dotnet restore</code> to install project dependencies.
- Navigate to the directory GameOfDrones/ClientApp and run <code>npm install</code> from the command console to ensure all dependencies get installed.
- Once done, run the command <code>Update-Database</code> to apply database migrations via Entity Framework Core.
- Compile the solution (Ctrl + Shift + B).
- Run the solution on your preferred Web browser (F5).


Note: for the sake of simplicity, this exercise uses a hard-coded connection string with the database parameters.

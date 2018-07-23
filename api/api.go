package api

import "github.com/labstack/echo"
import "github.com/labstack/echo/middleware"

func InitAPI() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	//g := e.Group("v1.0.0")

	// Start server
	e.Logger.Fatal(e.Start(":8384"))
}

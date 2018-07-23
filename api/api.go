package api

import (
	"github.com/ONSBR/Plataforma-UI/api/resources"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func InitAPI() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.Static("/", "./build")
	g := e.Group("v1.0.0")
	g.GET("/system", resources.FindAllSystem)

	// Start server
	e.Logger.Fatal(e.Start(":8384"))
}

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
	g.GET("/platform/islocked", resources.PlatformIsLocked)
	g.GET("/process/instances", resources.FindallProcessInstance)
	g.GET("/process/history", resources.GetInstanceHistory)
	g.GET("/reprocessing/findall", resources.FindallReprocessing)
	g.GET("/apps/operations", resources.FindallOperations)
	g.GET("/apps", resources.FindallApps)
	g.POST("/reprocessing/approve", resources.ApproveReprocessing)
	g.POST("/reprocessing/skip", resources.SkipReprocessing)
	// Start server
	e.Logger.Fatal(e.Start(":8384"))
}

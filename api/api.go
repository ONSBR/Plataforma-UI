package api

import (
	"github.com/ONSBR/Plataforma-UI/api/resources"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func InitAPI() {
	e := echo.New()

	// Middleware
	//e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.Static("/", "./build")
	g := e.Group("v1")
	g.GET("/system", resources.FindAllSystem)

	g.GET("/platform/islocked", resources.PlatformIsLocked)
	g.GET("/platform/queues", resources.GetQueuesStatus)

	g.GET("/process/instances", resources.FindallProcessInstance)
	g.GET("/process/history", resources.GetInstanceHistory)
	g.GET("/process/:id", resources.FindProcessInstanceById)

	g.POST("/apps/operations/fixup", resources.FixUpOperations)
	g.GET("/apps/operations", resources.FindallOperations)
	g.POST("/apps/emitEvent", resources.EmitEvent)
	g.GET("/apps/events", resources.LastEvents)
	g.GET("/apps", resources.FindallApps)

	g.POST("/reproduction/:instanceID", resources.Reproduce)
	g.GET("/reproduction/findall", resources.FindallReproductions)

	g.GET("/reprocessing/findall", resources.FindallReprocessing)
	g.POST("/reprocessing/approve", resources.ApproveReprocessing)
	g.POST("/reprocessing/skip", resources.SkipReprocessing)
	g.POST("/reprocessing/overrideStatus", resources.OverrideReprocessingStatus)

	g.POST("/replay/upload", resources.UploadTape)
	g.POST("/replay/:systemID/rec", resources.Rec)
	g.POST("/replay/:systemID/stop", resources.Stop)
	g.GET("/replay/:systemID/tapes", resources.Tapes)
	g.GET("/replay/:systemID/isrecording", resources.IsRecording)
	g.GET("/replay/:systemID/download/:id", resources.Download)
	g.DELETE("/replay/tape/:id", resources.Delete)

	// Start server
	e.Logger.Fatal(e.Start(":8384"))
}

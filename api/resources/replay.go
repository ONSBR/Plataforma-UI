package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func Rec(c echo.Context) error {
	service := services.NewReplayService()
	return service.Rec(c.Param("systemID"))
}

func Stop(c echo.Context) error {
	service := services.NewReplayService()
	return service.Stop(c.Param("systemID"))
}

func Tapes(c echo.Context) error {
	service := services.NewReplayService()
	tapes, err := service.Tapes(c.Param("systemID"))
	if err != nil {
		return err
	}
	return c.JSON(200, tapes)
}

func IsRecording(c echo.Context) error {
	service := services.NewReplayService()
	recording, err := service.Recording(c.Param("systemID"))
	if err != nil {
		return err
	}
	return c.JSON(200, H{"recording": recording})
}

func Download(c echo.Context) error {
	service := services.NewReplayService()
	data, err := service.Download(c.Param("systemID"), c.Param("id"))
	if err != nil {
		return err
	}
	return c.Blob(200, "application/octet-stream", data)
}

func Play(c echo.Context) error {
	return nil
}

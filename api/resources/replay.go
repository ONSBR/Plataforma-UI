package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func Rec(c echo.Context) error {
	service := services.NewReplayService()
	return service.Rec(c.Get("systemID").(string))
}

func Stop(c echo.Context) error {
	service := services.NewReplayService()
	return service.Stop(c.Get("systemID").(string))
}

func Tapes(c echo.Context) error {
	return nil
}

func Play(c echo.Context) error {
	return nil
}

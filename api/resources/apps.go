package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func FindallApps(c echo.Context) error {
	service := services.NewAppsService()
	apps, err := service.Findall(c.QueryParam("systemId"))
	if err != nil {
		return err
	}
	return c.JSON(200, apps)
}

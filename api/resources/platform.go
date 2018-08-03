package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

type H map[string]interface{}

func PlatformIsLocked(c echo.Context) error {
	service := services.NewPlatformService()
	locked, err := service.IsLocked(c.QueryParam("systemId"))
	if err != nil {
		return c.JSON(200, H{"systemId": c.QueryParam("systemId"), "locked": locked, "message": err.Error()})
	}
	return c.JSON(200, H{"systemId": c.QueryParam("systemId"), "locked": locked})
}

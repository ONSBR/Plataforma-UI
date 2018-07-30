package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func Reproduce(c echo.Context) error {
	instanceID := c.Param("instanceID")
	owner := c.QueryParam("owner")
	reproductionService := services.NewReproductionService()
	return reproductionService.Reproduce(instanceID, owner)
}

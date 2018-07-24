package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func FindallReprocessing(c echo.Context) error {
	service := services.NewReprocessingService()

	instances, err := service.Findall(c.QueryParam("systemId"), c.QueryParam("status"))
	if err != nil {
		return err
	}
	return c.JSON(200, instances)
}

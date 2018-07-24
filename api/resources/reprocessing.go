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

func ApproveReprocessing(c echo.Context) error {
	service := services.NewReprocessingService()

	instances, err := service.Approve(c.QueryParam("reprocessingId"), c.QueryParam("approver"))
	if err != nil {
		return err
	}
	return c.JSON(200, instances)
}

func SkipReprocessing(c echo.Context) error {
	service := services.NewReprocessingService()

	instances, err := service.Skip(c.QueryParam("reprocessingId"), c.QueryParam("approver"))
	if err != nil {
		return err
	}
	return c.JSON(200, instances)
}

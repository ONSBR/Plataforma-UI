package resources

import (
	"strconv"

	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func Reproduce(c echo.Context) error {
	instanceID := c.Param("instanceID")
	owner := c.QueryParam("owner")
	reproductionService := services.NewReproductionService()
	return reproductionService.Reproduce(instanceID, owner)
}

func FindallReproductions(c echo.Context) error {
	service := services.NewReproductionService()
	systemID := c.QueryParam("systemId")
	page := c.QueryParam("page")
	pageSize := c.QueryParam("pageSize")
	pageInt, err := strconv.Atoi(page)
	if err != nil {
		return err
	}
	pageSizeInt, err := strconv.Atoi(pageSize)
	result, err := service.FindallReproduction(systemID, pageInt, pageSizeInt)
	if err != nil {
		return err
	}
	return c.JSON(200, result)
}

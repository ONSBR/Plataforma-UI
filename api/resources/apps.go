package resources

import (
	"strconv"

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

func FindallOperations(c echo.Context) error {
	service := services.NewAppsService()
	page := c.QueryParam("page")
	pageSize := c.QueryParam("pageSize")
	pageInt, err := strconv.Atoi(page)
	if err != nil {
		return err
	}
	pageSizeInt, err := strconv.Atoi(pageSize)
	apps, err := service.FindallOperations(c.QueryParam("processId"), pageInt, pageSizeInt)
	if err != nil {
		return err
	}
	return c.JSON(200, apps)
}

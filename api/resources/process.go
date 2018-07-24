package resources

import (
	"strconv"

	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func FindallProcessInstance(c echo.Context) error {
	service := services.NewProcessService()
	page := c.QueryParam("page")
	pageSize := c.QueryParam("pageSize")
	pageInt, err := strconv.Atoi(page)
	if err != nil {
		return err
	}
	pageSizeInt, err := strconv.Atoi(pageSize)
	instances, err := service.GetProcessInstance(c.QueryParam("systemId"), pageInt, pageSizeInt)
	if err != nil {
		return err
	}
	return c.JSON(200, instances)
}

func GetInstanceHistory(c echo.Context) error {
	service := services.NewProcessService()
	memory, err := service.GetProcessMemory(c.QueryParam("instanceId"))
	if err != nil {
		return err
	}
	return c.JSON(200, memory)
}

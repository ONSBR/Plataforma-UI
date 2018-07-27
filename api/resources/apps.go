package resources

import (
	"strconv"

	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
)

func FindallApps(c echo.Context) error {
	service := services.NewAppsService()
	apps, err := service.Findall(c.QueryParam("systemId"))
	if err != nil {
		return err
	}
	return c.JSON(200, apps)
}

func FindallOperations(c echo.Context) (err error) {
	service := services.NewAppsService()
	page := c.QueryParam("page")
	pageSize := c.QueryParam("pageSize")
	pageInt := 0
	pageSizeInt := 0
	if page != "" && pageSize != "" {
		pageInt, err = strconv.Atoi(page)
		if err != nil {
			return
		}
		pageSizeInt, err = strconv.Atoi(pageSize)
	}
	apps, err := service.FindallOperations(c.QueryParam("processId"), pageInt, pageSizeInt)
	if err != nil {
		return
	}
	return c.JSON(200, apps)
}

type fixupImages struct {
	Origin string   `json:"origin"`
	Dest   []string `json:"destiny"`
}

func FixUpOperations(c echo.Context) error {
	service := services.NewAppsService()
	fix := fixupImages{}
	err := c.Bind(&fix)
	if err != nil {
		log.Error(err)
		return err
	}
	err = service.FixUpOperations(fix.Origin, fix.Dest)
	if err != nil {
		log.Error(err)
		return err
	}
	return c.JSON(200, H{"message": "images was fixed up"})
}

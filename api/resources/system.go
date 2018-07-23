package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

func FindAllSystem(e echo.Context) error {
	s := services.NewSystemService()
	systems, err := s.GetSystems()
	if err != nil {
		return err
	}
	return e.JSON(200, systems)
}

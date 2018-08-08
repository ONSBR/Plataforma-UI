package resources

import (
	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
)

//GetQueuesStatus returns information about all queues from rabbit like qtd messages, status, name and vhost
func GetQueuesStatus(e echo.Context) error {
	rabbitService := services.NewRabbitMqServices()
	status, err := rabbitService.GetQueueStatus()
	if err != nil {
		return err
	}
	return e.JSON(200, status)
}

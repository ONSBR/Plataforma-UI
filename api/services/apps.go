package services

import (
	"fmt"

	"github.com/ONSBR/Plataforma-EventManager/domain"

	"github.com/ONSBR/Plataforma-Deployer/sdk/eventmanager"

	"github.com/ONSBR/Plataforma-Deployer/sdk/apicore"
	"github.com/ONSBR/Plataforma-UI/etc"
	"github.com/labstack/gommon/log"
)

type AppsService struct {
}

func (plat *AppsService) Findall(systemID string) ([]map[string]interface{}, error) {
	result := make([]map[string]interface{}, 0)
	err := apicore.FindBySystemID("installedApp", systemID, &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (plat *AppsService) FindallOperations(processId string, page, pageSize int) ([]map[string]interface{}, error) {
	result := make([]map[string]interface{}, 0)
	err := apicore.Query(apicore.Filter{
		Entity:   "operation",
		Map:      "core",
		Name:     "byProcessIdOrdered",
		Page:     page,
		PageSize: pageSize,
		Params: []apicore.Param{apicore.Param{
			Key:   "processId",
			Value: processId,
		}},
	}, &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (plat *AppsService) FixUpOperations(originOperationID string, destOperationIDs []string) error {
	list := make([]etc.JSON, 0)
	err := apicore.FindByID("operation", originOperationID, &list)
	if err != nil {
		log.Error(err)
		return err
	}
	if len(list) == 0 {
		return fmt.Errorf("operation %s not found", originOperationID)
	}
	image := list[0].GetString("image")
	listUpdate := make([]map[string]interface{}, len(destOperationIDs))
	for i := 0; i < len(listUpdate); i++ {
		listUpdate[i] = make(map[string]interface{})
		_metadata := make(map[string]interface{})
		_metadata["changeTrack"] = "update"
		_metadata["type"] = "operation"
		listUpdate[i]["_metadata"] = _metadata
		listUpdate[i]["id"] = destOperationIDs[i]
		listUpdate[i]["image"] = image
	}
	return apicore.Persist(listUpdate)

}

type Event struct {
	Name    string                 `json:"name"`
	Payload map[string]interface{} `json:"payload"`
}

func (plat *AppsService) EmitEvent(event Event) error {
	evt := new(domain.Event)
	evt.Name = event.Name
	evt.Payload = event.Payload
	return eventmanager.Push(evt)
}

func (plat *AppsService) LastEvents(field, value, last string) ([]*domain.Event, error) {
	return eventmanager.LastEvents(field, value, last)
}

func NewAppsService() *AppsService {
	return new(AppsService)
}

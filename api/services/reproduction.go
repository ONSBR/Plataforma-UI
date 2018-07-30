package services

import (
	"fmt"

	"github.com/ONSBR/Plataforma-Deployer/sdk/apicore"
	"github.com/ONSBR/Plataforma-Deployer/sdk/eventmanager"
	"github.com/ONSBR/Plataforma-EventManager/domain"
)

type ReproductionService struct {
}

func (rep *ReproductionService) Reproduce(instanceID, owner string) error {
	e := domain.Event{
		Name: "system.events.reproduction.request",
		Reproduction: map[string]interface{}{
			"instanceId": instanceID,
			"owner":      owner,
		},
	}
	return eventmanager.Push(&e)
}

func (rep *ReproductionService) FindallReproduction(systemID string, page, pageSize int) ([]map[string]interface{}, error) {
	if systemID == "" {
		return nil, fmt.Errorf("systemId is required")
	}
	list := make([]map[string]interface{}, 0)
	err := apicore.Query(apicore.Filter{
		Map:      "core",
		Entity:   "reproduction",
		Name:     "bySystemIdOrdered",
		Page:     page,
		PageSize: pageSize,
		Params: []apicore.Param{
			apicore.Param{
				Key:   "systemId",
				Value: systemID,
			},
		},
	}, &list)
	if err != nil {
		return nil, err
	}
	return list, nil
}

func NewReproductionService() *ReproductionService {
	return new(ReproductionService)
}

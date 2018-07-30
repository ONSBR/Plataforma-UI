package services

import (
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

func NewReproductionService() *ReproductionService {
	return new(ReproductionService)
}

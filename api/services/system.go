package services

import (
	"github.com/ONSBR/Plataforma-Deployer/sdk/apicore"
)

type System struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type SystemService struct {
}

func (core *SystemService) GetSystems() ([]*System, error) {
	response := make([]*System, 0)
	err := apicore.Query(apicore.Filter{
		Entity: "system",
		Map:    "core",
	}, &response)
	if err != nil {
		return nil, err
	}
	return response, nil
}

func NewSystemService() *SystemService {
	return new(SystemService)
}

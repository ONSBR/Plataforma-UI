package services

import (
	"github.com/ONSBR/Plataforma-Deployer/sdk/apicore"
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

func NewAppsService() *AppsService {
	return new(AppsService)
}

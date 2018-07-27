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

func (plat *AppsService) FindallOperations(processId string, page, pageSize int) ([]map[string]interface{}, error) {
	result := make([]map[string]interface{}, 0)
	err := apicore.Query(apicore.Filter{
		Entity:   "operation",
		Map:      "core",
		Name:     "byProcessId",
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

func NewAppsService() *AppsService {
	return new(AppsService)
}

package services

import (
	"github.com/ONSBR/Plataforma-Deployer/sdk/apicore"
	"github.com/ONSBR/Plataforma-EventManager/sdk"
)

type ProcessInstance struct {
	ID             string `json:"id"`
	ProcessID      string `json:"processId"`
	SystemID       string `json:"systemId"`
	StartExecution string `json:"startExecution"`
	Status         string `json:"status"`
	OriginEvent    string `json:"origin_event_name"`
	IsFork         string `json:"isFork"`
	Branch         string `json:"baseline"`
	Scope          string `json:"scope"`
}

type ProcessService struct {
}

func (proc *ProcessService) GetProcessInstance(systemID string, page, pageSize int) ([]*ProcessInstance, error) {
	result := make([]*ProcessInstance, 0)
	err := apicore.Query(apicore.Filter{
		Map:      "core",
		Entity:   "processInstance",
		Name:     "bySystemIdOrdered",
		Page:     page,
		PageSize: pageSize,
		Params: []apicore.Param{
			apicore.Param{
				Key:   "systemId",
				Value: systemID,
			},
		},
	}, &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (proc *ProcessService) GetProcessMemory(instanceID string) ([]sdk.Memory, error) {
	return sdk.GetMemoryHistory(instanceID)
}

func NewProcessService() *ProcessService {
	return new(ProcessService)
}

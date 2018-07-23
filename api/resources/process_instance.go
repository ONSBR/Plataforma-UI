package resources

import (
	"github.com/ONSBR/Plataforma-Deployer/sdk/apicore"
)

type ProcessInstance struct {
}

func (core *ProcessInstance) GetProcessInstances(systemID string, page, size int) ([]byte, error) {
	response := make(map[string]interface{})
	apicore.FindBySystemID("processInstance", systemID, &response)
	return nil, nil
}

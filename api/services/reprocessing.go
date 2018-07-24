package services

import (
	"fmt"

	"github.com/ONSBR/Plataforma-EventManager/infra"
	"github.com/PMoneda/http"
)

type ReprocessingService struct {
}

func (rep *ReprocessingService) getURL() string {
	scheme := infra.GetEnv("MAESTRO_SCHEME", "http")
	host := infra.GetEnv("MAESTRO_HOST", "localhost")
	port := infra.GetEnv("MAESTRO_PORT", "6971")
	version := infra.GetEnv("MAESTRO_API_VERSION", "v1.0.0")
	return fmt.Sprintf("%s://%s:%s/%s", scheme, host, port, version)
}
func (rep *ReprocessingService) Findall(systemID, status string) ([]map[string]interface{}, error) {
	url := fmt.Sprintf("%s/reprocessing/%s/find?status=%s", rep.getURL(), systemID, status)
	result := make([]map[string]interface{}, 0)
	err := http.GetJSON(url, &result)
	return result, err
}

func NewReprocessingService() *ReprocessingService {
	return new(ReprocessingService)
}

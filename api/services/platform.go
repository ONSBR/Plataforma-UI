package services

import (
	"fmt"

	"github.com/PMoneda/http"

	"github.com/ONSBR/Plataforma-Deployer/env"
)

type PlatformService struct {
}

func (plat *PlatformService) IsLocked(systemID string) (bool, error) {
	scheme := env.Get("MAESTRO_SCHEME", "http")
	host := env.Get("MAESTRO_HOST", "localhost")
	port := env.Get("MAESTRO_PORT", "6971")
	url := fmt.Sprintf("%s://%s:%s/v1.0.0/gateway/%s/proceed", scheme, host, port, systemID)
	resp, err := http.Get(url)
	if err != nil {
		return false, err
	}
	return resp.Status != 200, nil
}

func NewPlatformService() *PlatformService {
	return new(PlatformService)
}

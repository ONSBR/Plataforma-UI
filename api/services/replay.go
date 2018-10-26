package services

import (
	"fmt"

	"github.com/ONSBR/Plataforma-EventManager/infra"
	"github.com/PMoneda/http"
)

type ReplayService struct {
}

func (rep *ReplayService) Rec(systemID string) (err error) {
	url := fmt.Sprintf("%s/tape/%s/rec", rep.getURL(), systemID)
	resp, err := http.Post(url, nil)
	if err != nil {
		return
	}
	if resp.Status != 200 {
		return fmt.Errorf("cannot start recording a tape for a system %s", systemID)
	}
	return
}

func (rep *ReplayService) Stop(systemID string) (err error) {
	url := fmt.Sprintf("%s/tape/%s/stop", rep.getURL(), systemID)
	resp, err := http.Post(url, nil)
	if err != nil {
		return
	}
	if resp.Status != 200 {
		return fmt.Errorf("cannot start recording a tape for a system %s", systemID)
	}
	return
}

func (rep *ReplayService) getURL() string {
	scheme := infra.GetEnv("REPLAY_SCHEME", "http")
	host := infra.GetEnv("REPLAY_HOST", "localhost")
	port := infra.GetEnv("REPLAY_PORT", "6081")
	version := infra.GetEnv("REPLAY_API_VERSION", "v1")
	return fmt.Sprintf("%s://%s:%s/%s", scheme, host, port, version)
}

func NewReplayService() *ReplayService {
	return new(ReplayService)
}

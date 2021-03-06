package services

import (
	"encoding/json"
	"fmt"

	"github.com/ONSBR/Plataforma-EventManager/infra"
	"github.com/PMoneda/http"
	"github.com/labstack/gommon/log"
)

type ReplayService struct {
}

func (rep *ReplayService) Rec(systemID string) (err error) {
	url := fmt.Sprintf("%s/tape/%s/rec", rep.getURL(), systemID)
	resp, err := http.Post(url, nil)
	if err != nil {
		return
	}
	if resp.Status != 201 {
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
	if resp.Status == 404 {
		err = nil
		return
	}
	if resp.Status != 200 {
		return fmt.Errorf("cannot stop recording a tape for a system %s", systemID)
	}
	return
}

func (rep *ReplayService) Tapes(systemID string) (result []string, err error) {
	url := fmt.Sprintf("%s/tape/%s/availables", rep.getURL(), systemID)
	log.Info(url)
	result = make([]string, 0)
	err = http.GetJSON(url, &result)
	if err != nil {
		return
	}
	return
}

func (rep *ReplayService) Recording(systemID string) (exist bool, err error) {
	url := fmt.Sprintf("%s/tape/%s/recording", rep.getURL(), systemID)
	resp, err := http.Get(url)
	if err != nil {
		return
	}
	exist = resp.Status == 200
	return
}

func (rep *ReplayService) Delete(tapeID string) (err error) {
	url := fmt.Sprintf("%s/tape/%s", rep.getURL(), tapeID)
	resp, err := http.Delete(url)
	if err != nil {
		return
	}
	if resp.Status == 400 {
		dic := make(map[string]string)
		err = json.Unmarshal(resp.Body, &dic)
		if err == nil {
			msg, exist := dic["message"]
			if exist {
				err = fmt.Errorf(msg)
			} else {
				err = fmt.Errorf("cannot delete tape %s", tapeID)
			}

		}

	}
	return
}

func (rep *ReplayService) Download(systemID, tapeID string) (body []byte, err error) {
	url := fmt.Sprintf("%s/tape/%s/download/%s", rep.getURL(), systemID, tapeID)
	resp, err := http.Get(url)
	if err != nil {
		return
	}
	body = resp.Body
	return
}

func (rep *ReplayService) Play(systemID, tapeID string) error {
	url := fmt.Sprintf("%s/tape/%s/play/%s", rep.getURL(), systemID, tapeID)
	resp, err := http.Post(url, nil)
	if err != nil {
		return err
	}
	if resp.Status != 200 {
		m := make(map[string]string)
		if err := json.Unmarshal(resp.Body, &m); err != nil {
			return err
		}
		message, ok := m["message"]
		if !ok {
			return fmt.Errorf("cannot start playing tape")
		}
		return fmt.Errorf(message)
	}
	return nil
}

func (rep *ReplayService) UploadTape(fileName string) (err error) {
	url := fmt.Sprintf("%s/tape/upload", rep.getURL())
	resp, err := http.FileUpload(url, nil, "tape", fileName)
	if err != nil {
		return
	}
	if resp.Status != 200 {
		err = fmt.Errorf("%s", string(resp.Body))
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

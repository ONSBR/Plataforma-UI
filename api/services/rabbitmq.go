package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/ONSBR/Plataforma-Deployer/env"
)

type RabbitMQService struct {
}

type QueueStatus struct {
	Messages int    `json:"messages"`
	Name     string `json:"name"`
	VHost    string `json:"vhost"`
	State    string `json:"state"`
}

func (rab *RabbitMQService) GetQueueStatus() ([]*QueueStatus, error) {
	host := env.Get("RABBITMQ_HOST", "localhost")
	port := env.Get("RABBITMQ_API_PORT", "15672")
	username := env.Get("RABBITMQ_USERNAME", "guest")
	password := env.Get("RABBITMQ_PASSWORD", "guest")
	url := fmt.Sprintf("http://%s:%s/api/queues?page=1&page_size=100&name=&use_regex=false&pagination=true", host, port)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.SetBasicAuth(username, password)
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	type Response struct {
		Items []*QueueStatus `json:"items"`
	}
	resp := Response{
		Items: make([]*QueueStatus, 0),
	}
	err = json.Unmarshal(body, &resp)
	if err != nil {
		return nil, err
	}
	return resp.Items, nil
}

func NewRabbitMqServices() *RabbitMQService {
	return new(RabbitMQService)
}

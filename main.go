package main

import (
	"github.com/ONSBR/Plataforma-UI/api"
	"github.com/labstack/gommon/log"
)

func main() {
	log.SetLevel(log.INFO)
	api.InitAPI()
}

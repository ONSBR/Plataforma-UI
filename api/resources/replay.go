package resources

import (
	"fmt"
	"io"
	"os"

	"github.com/ONSBR/Plataforma-UI/api/services"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
)

func Rec(c echo.Context) error {
	service := services.NewReplayService()
	return service.Rec(c.Param("systemID"))
}

func Stop(c echo.Context) error {
	service := services.NewReplayService()
	return service.Stop(c.Param("systemID"))
}

func Tapes(c echo.Context) error {
	service := services.NewReplayService()
	tapes, err := service.Tapes(c.Param("systemID"))
	if err != nil {
		return err
	}
	return c.JSON(200, tapes)
}

func IsRecording(c echo.Context) error {
	service := services.NewReplayService()
	recording, err := service.Recording(c.Param("systemID"))
	if err != nil {
		return err
	}
	return c.JSON(200, H{"recording": recording})
}

func Delete(c echo.Context) error {
	service := services.NewReplayService()
	tapeID := c.Param("id")
	err := service.Delete(tapeID)
	if err != nil {
		return err
	}
	return c.JSON(200, H{"message": fmt.Sprintf("tape %s was deleted", tapeID)})
}

func Download(c echo.Context) error {
	service := services.NewReplayService()
	data, err := service.Download(c.Param("systemID"), c.Param("id"))
	if err != nil {
		return err
	}
	return c.Blob(200, "application/octet-stream", data)
}

func UploadTape(c echo.Context) error {
	service := services.NewReplayService()
	// Source
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	fileName := file.Filename
	// Destination
	dst, err := os.Create(fileName)
	if err != nil {
		log.Error(err)
		return err
	}
	defer dst.Close()

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		log.Error(err)
		return err
	}
	dst.Close()
	if err := service.UploadTape(fileName); err != nil {
		log.Error(err)
		return err
	}
	if err := os.Remove(fileName); err != nil {
		log.Error(err)
	}
	return c.JSON(200, H{"message": fmt.Sprintf("tape %s was uploaded", file.Filename)})
}

func Play(c echo.Context) error {
	return nil
}

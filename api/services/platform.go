package services

type PlatformService struct {
}

func (plat *PlatformService) IsLocked(systemID string) (bool, error) {

	return false, nil
}

func NewPlatformService() *PlatformService {
	return new(PlatformService)
}

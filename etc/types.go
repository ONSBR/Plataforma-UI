package etc

type JSON map[string]interface{}

func (j JSON) GetString(key string) string {
	value, ok := j[key]
	if !ok {
		return ""
	}
	switch t := value.(type) {
	case string:
		return t
	}
	return ""
}

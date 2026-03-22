package datadragon

import (
	"regexp"
)

func ExtractVersion(path string) string {
	re := regexp.MustCompile(`(\d+\.\d+\.\d+)`)
	match := re.FindString(path)
	if match != "" {
		return match
	}
	return "unknown"
}

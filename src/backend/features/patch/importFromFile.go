package patch

import (
	"lol-build-bench/entities/cloudEvent"
	"lol-build-bench/entities/patch"
	"lol-build-bench/features/applicationScope"
	"lol-build-bench/features/dragontail"
)

func ImportFromFile(rootPath string, scope applicationScope.Scope) (patch.Patch, error) {
	var manifest, err = dragontail.ReadManifest(rootPath)
	if err != nil {
		return patch.Patch{}, err
	}

	var createEvent = patch.CreateEventFromManifest(*manifest)
	err = PushPatchEvent(createEvent, scope)
	if err != nil {
		return patch.Patch{}, err
	}

	return patch.BuildFromEvents([]cloudEvent.CloudEventer{&createEvent})
}

func PushPatchEvent(event patch.CreatePatchEvent, scope applicationScope.Scope) error {
	var push, commit, err = OpenPatchQueue(scope)
	if err != nil {
		return err
	}

	err = push(event)

	if err != nil {
		return err
	}

	return commit()
}

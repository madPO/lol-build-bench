# Data Model: Runes Uploader

## Entity: RunePath
Represents a category of runes (e.g., Domination, Inspiration).

- **id**: Integer (Unique identifier for the rune path)
- **key**: String (Programmatic key for the rune path, e.g., "Domination")
- **icon**: String (Path to the icon image for the rune path)
- **name**: String (Display name of the rune path, e.g., "Domination")
- **slots**: Array of objects, where each object contains an array of `Rune` entities. This represents the different tiers/slots within a rune path.

## Entity: Rune
Represents a single rune within a rune path.

- **id**: Integer (Unique identifier for the rune)
- **key**: String (Programmatic key for the rune, e.g., "Electrocute")
- **icon**: String (Path to the icon image for the rune)
- **name**: String (Display name of the rune, e.g., "Electrocute")
- **shortDesc**: String (Short description of the rune's effect)
- **longDesc**: String (Detailed description of the rune's effect)

CREATE TABLE IF NOT EXISTS patches (
		event_id UUID,
		oid String,
		created_time DateTime64(3, 'UTC'),
		source String,
		specversion String,
		type String,
		datacontenttype String,
		subject String,
		data JSON
	) ENGINE = ReplacingMergeTree(created_time)
	ORDER BY (subject, type);

-- Items Table Schema
-- Feature: Items Uploaders (001-create-a-items)
-- Date: 2025-12-14
-- Purpose: Store League of Legends item data filtered to Summoner's Rift (map ID 11)

CREATE TABLE IF NOT EXISTS items (
    -- Item identifiers
    event_id UUID,                           -- Generated item identifier (primary)
    oid String,                         -- Original item ID from Data Dragon (e.g., "1001", "3340")
    pid String,                         -- Reference to patch PID (foreign key to patches.pid)
    created_time DateTime64(3, 'UTC'), -- Event creation timestamp (used for version ordering)

    -- CloudEvent metadata (standardized event structure)
    source String,                      -- Event source identifier (always "dragontail")
    specversion String,                 -- CloudEvents specification version (always "1.0")
    type String,                        -- Event type discriminator (always "item.created")
    datacontenttype String,             -- Data content MIME type (always "application/json")
    subject String,                     -- CloudEvent subject (item name for routing/filtering)

    -- Full item data payload
    data JSON                           -- Complete item details from Data Dragon (stats, gold, description, etc.)

) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, pid);

-- Runes Table Schema
-- Feature: Runes Uploader (002-runes-uploader)
-- Date: 2025-12-14
-- Purpose: Store League of Legends rune data

CREATE TABLE IF NOT EXISTS runes (
    -- Rune identifiers
    event_id UUID,                           -- Generated rune identifier (primary)
    oid String,                         -- Original rune ID from Data Dragon (e.g., "8100", "8112")
    pid String,                         -- Reference to patch PID (foreign key to patches.pid)
    created_time DateTime64(3, 'UTC'), -- Event creation timestamp (used for version ordering)

    -- CloudEvent metadata (standardized event structure)
    source String,                      -- Event source identifier (always "dragontail")
    specversion String,                 -- CloudEvents specification version (always "1.0")
    type String,                        -- Event type discriminator (always "rune.created")
    datacontenttype String,             -- Data content MIME type (always "application/json")
    subject String,                     -- CloudEvent subject (rune name for routing/filtering)

    -- Full rune data payload
    data JSON                           -- Complete rune details from Data Dragon (name, description, etc.)

) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, created_time, pid);

-- Champions Table Schema
-- Feature: Champions Upload (003-champions-upload)
-- Date: 2025-12-15
-- Purpose: Store League of Legends champion data with CloudEvent structure

CREATE TABLE IF NOT EXISTS champions (
    -- Champion identifiers
    event_id UUID,                           -- Generated champion identifier (primary)
    oid String,                         -- Original champion ID from Data Dragon (e.g., "Annie")
    pid String,                         -- Reference to patch PID (foreign key to patches.pid)
    created_time DateTime64(3, 'UTC'),  -- Event creation timestamp (used for version ordering)
    
    -- CloudEvent metadata (standardized event structure)
    source String,                      -- Event source identifier (always "dragontail")
    specversion String,                 -- CloudEvents specification version (always "1.0")
    type String,                        -- Event type discriminator (always "champion.created")
    datacontenttype String,             -- Data content MIME type (always "application/json")
    subject String,                     -- CloudEvent subject (champion name for routing/filtering)
    
    -- Full champion data payload
    data JSON                           -- Complete champion details: stats, abilities, passive, image, etc.

) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, created_time, pid);

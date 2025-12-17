-- Runes Table Schema
-- Feature: Runes Uploader (002-runes-uploader)
-- Date: 2025-12-14
-- Purpose: Store League of Legends rune data

CREATE TABLE IF NOT EXISTS runes (
    -- Rune identifiers
    event_id UUID,                           -- Generated rune identifier (primary)
    oid String,                         -- Original rune ID from Data Dragon (e.g., "8100", "8112")
    pid String,                         -- Reference to patch PID (foreign key to patches.pid)
    created_time DateTime64(3, 'UTC'),  -- Event creation timestamp (used for version ordering)

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

-- Engine Explanation:
-- ReplacingMergeTree(created_time): Automatically keeps the row with the latest created_time
--                                    for each unique combination of ORDER BY fields
-- ORDER BY (subject, type, created_time, pid): Defines the primary sorting key and uniqueness constraint
--                                Enables efficient queries by rune name, type, and original ID

-- Query Examples:
--
-- Get all current runes:
--   SELECT * FROM runes FINAL;
--
-- Get specific rune by name:
--   SELECT * FROM runes WHERE subject = 'Electrocute' FINAL;
--
-- Get all runes for a specific patch:
--   SELECT * FROM runes WHERE pid = '13.24.1' FINAL;
--
-- Get rune with full JSON data:
--   SELECT subject, data.longDesc FROM runes WHERE subject = 'Dark Harvest' FINAL;
--
-- Note: FINAL modifier forces ReplacingMergeTree to collapse duplicate rows in results
--       Always use FINAL when querying to ensure latest version is returned

-- Indexes:
-- Primary index: (subject, type, created_time, pid) automatically created via ORDER BY
-- Supports efficient filtering and sorting on these columns

-- Performance Characteristics:
-- - Fast inserts (append-only with background merge)
-- - Fast queries by subject (primary index)
-- - Automatic deduplication (ReplacingMergeTree merge process)
-- - Eventual consistency (duplicates removed during merge, use FINAL for immediate consistency)

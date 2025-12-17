-- Items Table Schema
-- Feature: Items Uploaders (001-create-a-items)
-- Date: 2025-12-17
-- Purpose: Store League of Legends item data filtered to Summoner's Rift (map ID 11)

CREATE TABLE IF NOT EXISTS items (
    -- Item identifiers
    event_id UUID,                           -- Generated event identifier (primary key)
    oid String,                         -- Original item ID from source system
    pid String,                        -- Reference to patch
    
    -- CloudEvent metadata (standardized event structure)
    created_time DateTime64(3, 'UTC'),     -- Event creation timestamp
    source String,                          -- Event source identifier
    specversion String,                     -- CloudEvents specification version
    type String,                            -- Event type discriminator
    datacontenttype String,                 -- Data content MIME type
    subject String,                         -- CloudEvent subject (business identifier)
    
    -- Full data payload
    data JSON                               -- Complete entity data
    
) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, pid);

-- Engine Explanation:
-- ReplacingMergeTree(created_time): Automatically keeps the row with the latest created_time
--                                    for each unique combination of ORDER BY fields
-- ORDER BY (subject, type, pid): Defines the primary sorting key and uniqueness constraint
--                                Enables efficient queries by item name, event type, and patch

-- Query Examples:
--
-- Get all current items for Summoner's Rift:
--   SELECT * FROM items WHERE JSONExtractInt(data, 'MapId') = 11 FINAL;
--
-- Get specific item by name:
--   SELECT * FROM items WHERE subject = 'Boots of Speed' FINAL;
--
-- Get all items for a specific patch:
--   SELECT * FROM items WHERE pid = '13.24.1' FINAL;
--
-- Get item with full JSON data:
--   SELECT subject, data.description, data.gold.total FROM items WHERE subject = 'Infinity Edge' FINAL;
--
-- Note: FINAL modifier forces ReplacingMergeTree to collapse duplicate rows in results
--       Always use FINAL when querying to ensure latest version is returned

-- Performance Characteristics:
-- - Fast inserts (append-only with background merge)
-- - Fast queries by subject (primary index)
-- - Automatic deduplication (ReplacingMergeTree merge process)
-- - Eventual consistency (duplicates removed during merge, use FINAL for immediate consistency)

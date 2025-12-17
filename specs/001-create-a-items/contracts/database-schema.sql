-- Items Table Schema
-- Feature: Items Uploaders (001-create-a-items)
-- Date: 2025-12-14
-- Purpose: Store League of Legends item data filtered to Summoner's Rift (map ID 11)

CREATE TABLE IF NOT EXISTS items (
    -- Item identifiers
    iid UUID,                           -- Generated item identifier (primary)
    oid String,                         -- Original item ID from Data Dragon (e.g., "1001", "3340")
    pid String,                   -- Reference to patch PID (foreign key to patches.pid)
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
ORDER BY (subject, type, created_time, pid);

-- Engine Explanation:
-- ReplacingMergeTree(created_time): Automatically keeps the row with the latest created_time
--                                    for each unique combination of ORDER BY fields
-- ORDER BY (name, map_id, oid): Defines the primary sorting key and uniqueness constraint
--                                Enables efficient queries by item name, map filter, and original ID

-- Query Examples:
--
-- Get all current items for Summoner's Rift:
--   SELECT * FROM items WHERE map_id = 11 FINAL;
--
-- Get specific item by name:
--   SELECT * FROM items WHERE name = 'Boots of Speed' AND map_id = 11 FINAL;
--
-- Get all items for a specific patch:
--   SELECT * FROM items WHERE patch_oid = '13.24.1' AND map_id = 11 FINAL;
--
-- Get item with full JSON data:
--   SELECT name, data.description, data.gold.total FROM items WHERE name = 'Infinity Edge' FINAL;
--
-- Note: FINAL modifier forces ReplacingMergeTree to collapse duplicate rows in results
--       Always use FINAL when querying to ensure latest version is returned

-- Indexes:
-- Primary index: (name, map_id, oid) automatically created via ORDER BY
-- Supports efficient filtering and sorting on these columns

-- Performance Characteristics:
-- - Fast inserts (append-only with background merge)
-- - Fast queries by name (primary index)
-- - Automatic deduplication (ReplacingMergeTree merge process)
-- - Eventual consistency (duplicates removed during merge, use FINAL for immediate consistency)

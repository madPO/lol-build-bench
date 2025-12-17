-- Champions Table Schema
-- Feature: Champions Upload (003-champions-upload)
-- Date: 2025-12-15
-- Purpose: Store League of Legends champion data with CloudEvent structure

CREATE TABLE IF NOT EXISTS champions (
    -- Champion identifiers
    cid UUID,                           -- Generated champion identifier (primary)
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

-- Engine Explanation:
-- ReplacingMergeTree(created_time): Automatically keeps the row with the latest created_time
--                                    for each unique combination of ORDER BY fields
-- ORDER BY (subject, type, created_time, pid): Defines the primary sorting key and uniqueness constraint
--                                               Enables efficient queries by champion name, event type, and patch

-- JSON Schema for data column
-- Complete champion object with all attributes:
-- {
--   "id": "Annie",
--   "key": 1,
--   "name": "Annie",
--   "title": "the Dark Child",
--   "partype": "Mana",
--   "image": {"full": "Annie.png", "sprite": "champion0.png", "group": "champion", "x": 384, "y": 0, "w": 48, "h": 48},
--   "baseStats": {
--     "hp": 560, "mp": 418, "movespeed": 335, "armor": 23, "spellblock": 30,
--     "attackrange": 625, "hpregen": 5.5, "mpregen": 8, "crit": 0,
--     "attackdamage": 50, "attackspeed": 0.61
--   },
--   "levelStats": {
--     "hpperlevel": 96, "mpperlevel": 25, "armorperlevel": 4, "spellblockperlevel": 1.3,
--     "hpregenperlevel": 0.55, "mpregenperlevel": 0.8, "critperlevel": 0,
--     "attackdamageperlevel": 2.65, "attackspeedperlevel": 1.36
--   },
--   "spells": [
--     {
--       "id": "AnnieQ", "name": "Disintegrate", "description": "...", "tooltip": "...",
--       "maxrank": 5, "cooldown": [4, 4, 4, 4, 4], "cost": [60, 65, 70, 75, 80],
--       "range": [625, 625, 625, 625, 625], "image": {"full": "AnnieQ.png", ...}
--     },
--     ... (3 more spells)
--   ],
--   "passive": {
--     "name": "Pyromania", "description": "After casting 4 spells...",
--     "image": {"full": "Annie_Passive.png", ...}
--   }
-- }

-- Query Examples:
--
-- Get all current champions for a patch:
--   SELECT subject, data.name, data.partype FROM champions WHERE pid = 'patch_15_24_1' FINAL;
--
-- Get specific champion by name:
--   SELECT data FROM champions WHERE subject = 'Annie' AND pid = 'patch_15_24_1' FINAL;
--
-- Get champion base health:
--   SELECT subject, data.baseStats.hp FROM champions WHERE pid = 'patch_15_24_1' FINAL;
--
-- Get all champions with mana resource:
--   SELECT subject, data.partype FROM champions WHERE data.partype = 'Mana' AND pid = 'patch_15_24_1' FINAL;
--
-- Compare champion stats between patches:
--   SELECT c1.subject, c1.data.baseStats.hp AS hp_old, c2.data.baseStats.hp AS hp_new
--   FROM champions c1
--   JOIN champions c2 ON c1.subject = c2.subject
--   WHERE c1.pid = 'patch_15_24_1' AND c2.pid = 'patch_15_25_1' FINAL;
--
-- Note: FINAL modifier forces ReplacingMergeTree to collapse duplicate rows in results
--       Always use FINAL when querying to ensure latest version is returned

-- Indexes:
-- Primary index: (subject, type, created_time, pid) automatically created via ORDER BY
-- Supports efficient filtering by champion name, event type, and patch reference

-- Performance Characteristics:
-- - Fast inserts (append-only with background merge)
-- - Fast queries by champion name (subject in primary index)
-- - Automatic deduplication (ReplacingMergeTree merge process)
-- - Eventual consistency (duplicates removed during merge, use FINAL for immediate consistency)

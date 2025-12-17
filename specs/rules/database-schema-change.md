Version: 1.0.0  
Last Updated: 2025-12-17  
Applies To: All ClickHouse database schema changes in LoL Build Bench

Overview
This document defines the standardized process for creating and modifying database schemas in the LoL Build Bench project. All database changes must follow these guidelines to maintain consistency, performance, and reliability across features.
1. Schema Creation Process

1.1 Required Files
Every feature that requires database changes MUST create:
1. Contract Schema (specs/{feature-id}/contracts/database-schema.sql)
   - Standalone CREATE TABLE statement
   - Includes detailed comments and examples
   - Used for documentation and review
2. Main Database Script (scripts/database.sql)
   - Consolidated schema for all tables
   - Updated with new table definitions
   - Used for database initialization

1.2 File Structure
specs/{feature-id}/
├── contracts/
│   └── database-schema.sql    # Feature-specific schema (detailed)
└── data-model.md              # Data model documentation
scripts/
└── database.sql               # Consolidated schema (append-only)

2. Schema Design Principles
2.1 Table Naming Convention
- Use plural nouns for table names: items, runes, champions
- Use snake_case for all identifiers
2.2 Column Naming Convention
- Use snake_case for column names
- Primary key: event_id (UUID) - Standard CloudEvent identifier for all tables
- Foreign key: {referenced_table_singular}_id (e.g., pid)
- Original ID: oid (String) - Original identifier from source system (e.g., Data Dragon)
- Timestamps: {action}_time (e.g., created_time, updated_time)

2.3 Engine Selection
| Engine | Use Case | When to Use |
|--------|----------|-------------|
| ReplacingMergeTree(version_column) | Event-driven data with automatic deduplication | CloudEvent patterns, versioned data |
| MergeTree | Append-only time-series data | Logs, metrics, immutable data |
| AggregatingMergeTree | Pre-aggregated metrics | Analytics, dashboards |
| CollapsingMergeTree | State changes with sign column | Inventory, status tracking |

3. CloudEvent Pattern (Required for Data Changes)
3.1 Standard CloudEvent Columns
All tables storing business data MUST include these CloudEvent columns:
-- CloudEvent metadata (standardized event structure)
created_time DateTime64(3, 'UTC'),     -- Event creation timestamp
source String,                      -- Event source identifier
specversion String,                 -- CloudEvents specification version
type String,                        -- Event type discriminator
datacontenttype String,             -- Data content MIME type
subject String,                     -- CloudEvent subject (business identifier)
-- Full data payload
data JSON                           -- Complete entity data

3.2 Example: Items Table
CREATE TABLE IF NOT EXISTS items (
    -- Item identifiers
    event_id UUID,                           -- Generated event identifier (primary key)
    oid String,                         -- Original item ID from source system
    pid String,                        -- Reference to patch
    
    -- CloudEvent metadata (REQUIRED)
    created_time DateTime64(3, 'UTC'),     -- Event creation timestamp
    source String,                          -- Always "dragontail"
    specversion String,                     -- Always "1.0"
    type String,                            -- Always "item.created"
    datacontenttype String,                 -- Always "application/json"
    subject String,                         -- Item name for routing
    
    -- Full item data payload
    data JSON                               -- Complete item details
    
) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, pid);

4. Performance Considerations
4.1 ORDER BY Clause Design
- Primary sorting key: Most frequently filtered columns
- Include version column: For ReplacingMergeTree deduplication
- Limit to 3-5 columns: Balance between query performance and insert speed

4.2 Indexing Strategy
- ClickHouse creates primary index from ORDER BY columns
- No secondary indexes needed for most use cases
- Use materialized views for complex query patterns

4.3 Partitioning
- Use partitioning for very large tables (>100M rows)
- Partition by date for time-series data
- Avoid over-partitioning (aim for 10-100 partitions)
-- Example partitioning by month
PARTITION BY toYYYYMM(created_time)

5. Schema Documentation Requirements
5.1 Contract Schema File Template
-- {Table Name} Table Schema
-- Feature: {Feature Name} ({feature-id})
-- Date: {YYYY-MM-DD}
-- Purpose: {Brief description of table purpose}
CREATE TABLE IF NOT EXISTS {table_name} (
    -- {Section comment}
    {column_name} {data_type},              -- {Column description}
    
    -- CloudEvent metadata (standardized event structure)
    created_time DateTime64(3, 'UTC'),     -- Event creation timestamp
    source String,                          -- Event source identifier
    specversion String,                     -- CloudEvents specification version
    type String,                            -- Event type discriminator
    datacontenttype String,                 -- Data content MIME type
    subject String,                         -- CloudEvent subject
    
    -- Full data payload
    data JSON                               -- Complete entity data
    
) ENGINE = {engine_type}({version_column})
ORDER BY ({order_by_columns});
-- Engine Explanation:
-- {Explain engine choice and behavior}
-- Query Examples:
--
-- {Example query 1}
--   SELECT * FROM {table_name} WHERE {condition} FINAL;
--
-- {Example query 2}
--   SELECT {columns} FROM {table_name} WHERE {condition} FINAL;
-- Performance Characteristics:
-- - {Characteristic 1}
-- - {Characteristic 2}
-- - {Characteristic 3}

5.2 Data Model Documentation
Include in data-model.md:
- Entity definitions with field descriptions
- Relationships between tables
- Data flow diagrams
- Query patterns

6. Change Management Process

6.1 Adding New Tables
1. Create contract schema in feature directory
2. Update main database script (scripts/database.sql)
3. Document data model in data-model.md

6.2 Modifying Existing Tables
ClickHouse limitations: 
- Cannot ALTER ORDER BY or PRIMARY KEY
- Limited ALTER TABLE operations
Approach for schema changes:
1. Create new table with updated schema
2. Migrate data from old table
3. Update application code to use new table
4. Drop old table after validation
6.3 Breaking Changes
Breaking changes require:
1. Version migration script in scripts/migrations/
2. Data preservation strategy
3. Rollback plan
4. Feature flag for gradual rollout

7. Examples by Feature Type
7.1 Event-Driven Data (Items, Runes, Champions)
-- Example: Items table
CREATE TABLE IF NOT EXISTS items (
    event_id UUID,
    pid String,
    
    -- CloudEvent metadata
    created_time DateTime64(3, 'UTC'),
    source String,
    specversion String,
    type String,
    datacontenttype String,
    subject String,
    
    data JSON
    
) ENGINE = ReplacingMergeTree(created_time)
ORDER BY (subject, type, pid);

8. Validation Checklist
Before submitting a schema change:
- [ ] Contract schema file created with proper documentation
- [ ] Main database script updated
- [ ] Data model documented in data-model.md
- [ ] CloudEvent columns included (if applicable)
- [ ] Appropriate engine selected
- [ ] ORDER BY clause optimized for query patterns
- [ ] Performance characteristics documented
- [ ] Query examples provided
- [ ] Tested with sample data
- [ ] Quickstart instructions updated

9. Common Pitfalls to Avoid
1. Missing FINAL modifier: Always use FINAL with ReplacingMergeTree queries
2. Over-indexing: ClickHouse doesn't need many indexes
3. Wrong data types: Use DateTime64(3, 'UTC') not DateTime
4. Missing version column: ReplacingMergeTree requires version column
5. Poor ORDER BY: Choose columns based on query patterns
6. No partitioning: Large tables need partitioning
7. Ignoring deduplication: Plan for duplicate event handling

---

*Based on Project Constitution v1.5.0 - Last validated: 2025-12-17

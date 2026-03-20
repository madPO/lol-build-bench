# Data Model: Inventory Section Redesign

The feature primarily modifies the UI layer and does not introduce new state logic, but interacts with the existing context.

## Entities

### `BuildState` (Context)

The core data model `BuildState.inventory` remains an array of size 6 representing the fixed inventory slots.

```typescript
interface Item {
  id: string;
  name: string;
  image: string;
  gold: { total: number };
}

// 6 fixed slots: `null` represents an empty slot
type Inventory = [
  Item | null,
  Item | null,
  Item | null,
  Item | null,
  Item | null,
  Item | null
];
```

## Transformations (to be modified/removed)

- `computeTotalGold(inventory: Inventory): number` - **DEPRECATED**. Should be removed from `web/src/features/item-build/model/inventory.ts`.
- `countFilledSlots(inventory: Inventory): number` - **DEPRECATED**. Should be removed from `web/src/features/item-build/model/inventory.ts`.

# Frontend UI Contracts

## Champion Data Structure (JSON)

This is the expected format of the `champions.json` data source, which acts as the contract between static data storage and the Qwik frontend.

```typescript
// Location: web/src/entities/champion/model/types.ts

export interface ChampionStatList {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface Champion {
  id: string;            // e.g. "Aatrox"
  name: string;          // e.g. "Aatrox"
  title: string;         // e.g. "the Darkin Blade" (optional, but part of standard Riot API)
  avatarUrl: string;     // e.g. "/images/champions/Aatrox.png"
  stats: ChampionStatList;
}

export type ChampionList = Record<string, Champion>; // Dictionary mapped by ID
```

## Internal Component Contracts

### `<ChampionAvatar />`
- **Props**: `championId?: string`, `avatarUrl?: string`, `onClick$?: PropFunction<() => void>`
- **Behavior**: Renders empty placeholder if no ID/URL is provided. Fires `onClick$` to open modal.

### `<ChampionStats />`
- **Props**: `stats: ChampionStatList`
- **Behavior**: Renders stats in a multi-column CSS Grid. Adapts to fit without scrolling.

### `<SelectChampionModal />`
- **Props**: `isOpen: Signal<boolean>`, `onSelect$: PropFunction<(championId: string) => void>`
- **Behavior**: Shows a grid of all champions with CSS-only tooltips. Emits `onSelect$` and toggles `isOpen` to false on selection.
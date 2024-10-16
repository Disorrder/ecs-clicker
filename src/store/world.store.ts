import { create } from "zustand";
import { DAY_TICKS, YEAR_DAYS } from "~/game/const";

interface WorldState {
  tick: number;
  day: number;
  year: number;

  addTick: () => void;
  resetCalendar: () => void;

  /* Resources */

  resources: Map<string, number>;
  resourceLimits: Map<string, number>;

  resetResources: () => void;
  patchResourceLimits: (data: Record<string, number>) => void;
  patchResources: (data: Record<string, number>) => void;
  charge: (resources: Record<string, number>) => void;
  withdraw: (resources: Record<string, number>) => boolean;
  canWithdraw: (resources: Record<string, number>) => boolean;

  /* Resource deltas */

  _prevResources: Map<string, number>;
  resourceDelta: Map<string, number>;
  updateResourceDelta: () => void;

  /* Entities */

  entities: Map<string, number>;
  resetEntities: () => void;
  addEntity: (slug: string, amount?: number) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  tick: 0,
  day: 1,
  year: 1,

  addTick: () => {
    set((state) => {
      let tick = state.tick + 1;
      let day = state.day;
      let year = state.year;

      if (tick >= DAY_TICKS) {
        tick = 0;
        day += 1;
      }
      if (day > YEAR_DAYS) {
        day = 1;
        year += 1;
      }

      return { tick, day, year };
    });
  },

  resetCalendar: () => {
    set({ tick: 0, day: 1, year: 1 });
  },

  /* Resources */

  resources: new Map<string, number>(),
  resourceLimits: new Map<string, number>(),

  resetResources: () => {
    set({
      resources: new Map<string, number>(),
      resourceLimits: new Map<string, number>(),
    });
  },

  patchResourceLimits: (data: Record<string, number>) => {
    set((state) => {
      const { resourceLimits } = state;
      const newMap = new Map<string, number>(resourceLimits);
      for (const [resource, amount] of Object.entries(data)) {
        newMap.set(resource, amount);
      }
      return { resourceLimits: newMap };
    });
  },

  patchResources: (data: Record<string, number>) => {
    set((state) => {
      const { resources, resourceLimits } = state;
      const newMap = new Map<string, number>(resources);
      for (const [resource, amount] of Object.entries(data)) {
        const lim = resourceLimits.get(resource);
        if (lim === undefined) continue;
        newMap.set(resource, Math.min(amount, lim));
      }
      return { resources: newMap };
    });
  },

  setResourceDelta: (resourceDelta: Map<string, number>) => {
    set({ resourceDelta });
  },

  charge: (data: Record<string, number>) => {
    set((state) => {
      const { resources, resourceLimits } = state;
      const newMap = new Map<string, number>(resources);
      for (const [resource, add] of Object.entries(data)) {
        const lim = resourceLimits.get(resource);
        if (lim === undefined) continue;
        const amount = resources.get(resource) || 0;
        newMap.set(resource, Math.min(amount + add, lim));
      }
      return { resources: newMap };
    });
  },

  canWithdraw: (data: Record<string, number>) => {
    const { resources } = useWorldStore.getState();
    for (const [resource, amount] of Object.entries(data)) {
      const currentAmount = resources.get(resource) || 0;
      if (currentAmount < amount) {
        return false;
      }
    }
    return true;
  },

  withdraw: (data: Record<string, number>) => {
    try {
      set((state) => {
        const { resources } = state;
        const newMap = new Map<string, number>(resources);
        for (const [resource, amount] of Object.entries(data)) {
          const currentAmount = resources.get(resource) || 0;
          if (currentAmount < amount) {
            throw new Error(
              `Not enough ${resource}: ${currentAmount} < ${amount}`,
            );
          }
          newMap.set(resource, currentAmount - amount);
        }
        return { resources: newMap };
      });
    } catch (e) {
      console.error("[World: withdraw]", e);
      return false;
    }
    return true;
  },

  /* Resource deltas */

  _prevResources: new Map<string, number>(),
  resourceDelta: new Map<string, number>(),

  updateResourceDelta: () => {
    set((state) => {
      const { resources, _prevResources } = state;
      const newMap = new Map<string, number>();
      resources.forEach((amount, slug) => {
        const prev = _prevResources.get(slug);
        if (prev === undefined) return;
        newMap.set(slug, amount - prev);
      });
      return { resourceDelta: newMap, _prevResources: resources };
    });
  },

  /* Entities */

  entities: new Map<string, number>(),

  resetEntities: () => {
    set({ entities: new Map<string, number>() });
  },

  addEntity: (slug: string, amount = 1) => {
    set((state) => {
      const newMap = new Map<string, number>(state.entities);
      newMap.set(slug, (newMap.get(slug) || 0) + amount);
      return { entities: newMap };
    });
  },
}));

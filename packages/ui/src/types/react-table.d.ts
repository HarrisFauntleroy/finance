import { RankingInfo } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

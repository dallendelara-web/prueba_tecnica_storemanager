import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import type { FilterComponentProps } from "@/types/Components";

const FilterComponent = ({
  search,
  setSearch,
  searchPlaceholder,
  actions,
}: FilterComponentProps) => {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none"
            placeholder={searchPlaceholder}
          />
        </div>
        {actions ? (
          <div className="w-full flex flex-1 flex-row justify-end items-center ">
            {actions}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default FilterComponent;

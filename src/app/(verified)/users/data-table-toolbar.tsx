"use client";

// import { Cross2Icon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../../../components/data-table/data-table-view-options";
import { CheckIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [filter, setFilter] = useState("Email");
  const [femaleOnly, setFemaleOnly] = useState(false);

  useEffect(() => {
    if (femaleOnly) {
      table.getColumn("Gender")?.setFilterValue("Female");
    } else {
      table.getColumn("Gender")?.setFilterValue("");
    }
  }, [femaleOnly, table]);

  return (
    <div className="flex flex-col items-start justify-between gap-2 rounded-lg bg-[#f9fafb] px-3 py-4 shadow-md md:flex-row md:items-center">
      <div className="flex items-center space-x-2">
        <div className="relative flex">
          <Select
            value={filter}
            onValueChange={(value: string) => setFilter(value)}
          >
            <SelectTrigger className="mr-2">
              <SelectValue placeholder={filter} />
            </SelectTrigger>
            <SelectContent side="top">
              {[
                "First Name",
                "Last Name",
                "Email",
                "Reg No",
                "Phone Number",
              ].map((filterVal) => (
                <SelectItem key={filterVal} value={`${filterVal}`}>
                  {filterVal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter..."
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filter)?.setFilterValue(event.target.value)
            }
            className="w-[150px] pr-10 lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.resetColumnFilters()}
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <X size={20} />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
        <Button
          variant={femaleOnly ? "secondary" : "outline"}
          className="ml-auto flex"
          onClick={() => setFemaleOnly(!femaleOnly)}
        >
          {femaleOnly && <CheckIcon size={20} className="mr-2" />} Females Only
        </Button>
      </div>
    </div>
  );
}

"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { type Team } from "@/schemas/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BanIcon, EyeIcon } from "lucide-react";

export const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          title="Sr. No."
          className="text-center text-sm font-semibold text-foreground"
          column={column}
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-muted-foreground">
        {row.index + 1}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "Team Name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Team Name"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.team_name.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>{row.original.team_name.substring(0, 35)}...</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.team_name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.team_name} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.team_name.toLowerCase();
      return file.includes((filterValue as string).toLowerCase());
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.team_name;
      const valueB = rowB.original.team_name;
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    },
    enableHiding: false,
  },
  {
    accessorKey: "Team Code",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Team Code"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.team_code.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipContent>
                <p>{row.original.team_code}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.team_code} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.team_code.toLowerCase();
      return file.includes((filterValue as string).toLowerCase());
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.team_code;
      const valueB = rowB.original.team_code;
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    },
  },
  {
    accessorKey: "Round",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Round"
        className="text-center text-sm font-semibold text-foreground"
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-muted-foreground">
        {row.original.round}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.round;
      const valueB = rowB.original.round;
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    },
    filterFn: (row, id, filterValue) => {
      const file = row.original.round;
      return file == (filterValue as number);
    },
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-center text-sm font-semibold text-foreground"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="mt-2 flex items-center justify-center text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <Link href={`/team?id=${row.original.id}`}>
                    <EyeIcon size={23} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <BanIcon size={20} color="#a30d11" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ban User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

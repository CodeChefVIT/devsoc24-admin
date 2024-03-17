"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { type Project } from "@/schemas/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EyeIcon } from "lucide-react";

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Title",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Title"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.name.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>{row.original.name.substring(0, 35)}...</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.name} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.name.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.name;
      const valueB = rowB.original.name;
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
    accessorKey: "Track",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Track"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.track.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipContent>
                <p>{row.original.track}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.track} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.track.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.track;
      const valueB = rowB.original.track;
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
    accessorKey: "Github",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Github"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.github_link.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipContent>
                <p>{row.original.github_link}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.github_link} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.github_link.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.github_link;
      const valueB = rowB.original.github_link;
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
    accessorKey: "Figma",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Figma"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.figma_link.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipContent>
                <p>{row.original.figma_link}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.figma_link} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.figma_link.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.figma_link;
      const valueB = rowB.original.figma_link;
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
        <div className="mt-2 flex items-center justify-between text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <Link href={`./team?id=${row.original.team_id}`}>
                    <EyeIcon size={23} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
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

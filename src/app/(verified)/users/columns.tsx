"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { type User } from "@/schemas/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BanIcon, EyeIcon } from "lucide-react";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "First Name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="First Name"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.first_name.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>{row.original.first_name.substring(0, 35)}...</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.first_name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.first_name} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.first_name.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.first_name;
      const valueB = rowB.original.first_name;
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
    accessorKey: "Last Name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Last Name"
          className="text-left text-sm font-semibold text-foreground"
        />
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.last_name.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>{row.original.last_name.substring(0, 35)}...</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.last_name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.last_name} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.last_name.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.last_name;
      const valueB = rowB.original.last_name;
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
    accessorKey: "Reg No",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Reg No"
        className="text-center text-sm font-semibold text-foreground"
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-muted-foreground">
        {row.original.reg_no}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.reg_no;
      const valueB = rowB.original.reg_no;
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
    accessorKey: "Email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="text-left text-sm font-semibold text-foreground"
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium">
        {row.original.email.length > 35 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p>{row.original.email.substring(0, 35)}...</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p> {row.original.email} </p>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.email.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.email;
      const valueB = rowB.original.email;
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
    accessorKey: "Phone Number",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone Number"
        className="text-center text-sm font-semibold text-foreground"
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-muted-foreground">
        {row.original.phone_number}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.phone_number.toLowerCase();
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.phone_number;
      const valueB = rowB.original.phone_number;

      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      }
      return 0;
    },
  },
  {
    accessorKey: "Gender",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Gender"
        className="text-center text-sm font-semibold text-foreground"
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-sm font-medium text-muted-foreground">
        {row.original.gender}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const file = row.original.gender;
      return file.includes(filterValue as string);
    },
    sortingFn: (rowA, rowB) => {
      const valueA = rowA;
      const valueB = rowB;
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
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
                  <Link href={`./user?email=${row.original.email}`}>
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

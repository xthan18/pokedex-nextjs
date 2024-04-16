"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"

function addZeroesToID(ID: number) {
    let len = String(ID).length;
    if (len == 2) 
        {
            return ("0" + String(ID));
        } 
        else if (len == 1)
        {
            return ("00" + String(ID));
        }
        else
        {
            return String(ID);
        }
}

function getPokemonImageURL(ID: number) {
    return ("https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + addZeroesToID(ID) + ".png");
}

export type Pokemon = {
    id: number
    name: string
}

export const columns: ColumnDef<Pokemon>[] = [
    {
        accessorKey: "id",
        header: "Image",
        cell: (info: any) =>
        <Image
        src={getPokemonImageURL(info.getValue())}
        alt ={""}
        width="60"
        height="60"
        />
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            #
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
    },
]


"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Patient } from "@/lib/types"
import { RegisterPatientDialog } from "./register-patient-dialog"
import { useToast } from "@/hooks/use-toast"

const ActionCell = ({ row, onEdit }: { row: any, onEdit: (patient: Patient) => void }) => {
    const { toast } = useToast()
    const patient = row.original as Patient

    const copyPatientId = () => {
        navigator.clipboard.writeText(patient.id)
        toast({
            title: "ID copié",
            description: `L'ID du patient ${patient.name} a été copié dans le presse-papiers.`,
        })
    }
    
    const viewDetails = () => {
        toast({
            title: "Détails du patient",
            description: `Nom: ${patient.name}, Email: ${patient.email}`
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Ouvrir le menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={copyPatientId}>
                    Copier l'ID du patient
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={viewDetails}>Voir les détails</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(patient)}>Modifier le dossier</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: "Fonctionnalité non implémentée", variant: "destructive"})}>Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



interface PatientTableProps {
    patients: Patient[];
    onPatientRegistered: (newPatient: Omit<Patient, 'id' | 'lastVisit'>) => void;
    onPatientUpdated: (updatedPatient: Patient) => void;
}

export function PatientTable({ patients, onPatientRegistered, onPatientUpdated }: PatientTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isRegisterDialogOpen, setRegisterDialogOpen] = React.useState(false)
  const [editingPatient, setEditingPatient] = React.useState<Patient | null>(null)
  const { toast } = useToast()

  const handleEditClick = (patient: Patient) => {
    setEditingPatient(patient);
    setRegisterDialogOpen(true);
  };
  
  const handleOpenCreateDialog = () => {
    setEditingPatient(null);
    setRegisterDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
        setEditingPatient(null);
    }
    setRegisterDialogOpen(open);
  }
  
  const handlePatientSaved = (patientData: Omit<Patient, 'id' | 'lastVisit'> & { id?: string }) => {
    if (patientData.id) { // Editing
      onPatientUpdated(patientData as Patient);
    } else { // Creating
      onPatientRegistered(patientData);
    }
  }
  
  const columns: ColumnDef<Patient>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Tout sélectionner"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Sélectionner la ligne"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "gender",
      header: "Genre",
    },
    {
      accessorKey: "age",
      header: "Âge",
    },
    {
      accessorKey: "lastVisit",
      header: "Dernière visite",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ActionCell row={row} onEdit={handleEditClick} />,
    },
  ]

  const table = useReactTable({
    data: patients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
        pagination: {
            pageSize: 3,
        }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
            <div>
                <CardTitle>Tous les patients</CardTitle>
                <CardDescription>Une liste de tous les patients du système.</CardDescription>
            </div>
            <Button onClick={handleOpenCreateDialog}>
                <UserPlus className="mr-2 h-4 w-4" />
                Enregistrer un nouveau patient
            </Button>
        </div>
        <div className="flex items-center justify-between pt-4">
          <Input
            placeholder="Filtrer par nom..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Colonnes <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Aucun résultat.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} sur{" "}
            {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Suivant
            </Button>
          </div>
        </div>
      </CardContent>
      <RegisterPatientDialog 
        open={isRegisterDialogOpen} 
        onOpenChange={handleDialogClose} 
        onPatientSaved={handlePatientSaved}
        patient={editingPatient}
        />
    </Card>
  )
}

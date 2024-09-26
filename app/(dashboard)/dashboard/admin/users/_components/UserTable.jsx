"use client";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { useState } from "react";
import { useOptimisticAction } from "next-safe-action/hooks";
import { deleteUser } from "@/utils/actions/admin/delete-user";
import { toast } from "@/hooks/use-toast";

export const UserTable = ({ nodes, users }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false); // Control dialog de ștergere
  const [isOpenEdit, setIsOpenEdit] = useState(false); // Control dialog de editare
  const [selectedUser, setSelectedUser] = useState(null); // Păstrează user-ul selectat pentru editare/ștergere

  const { execute, optimisticState } = useOptimisticAction(deleteUser, {
    currentState: users,
    updateFn: (state, { id }) => {
      return state.filter((user) => user.id !== id);
    },
    onSuccess: ({ data }) => {
      toast({
        variant: "default",
        title: "Succes",
        description: `User-ul ${data.name} a fost șters cu succes!`,
        duration: 3000,
      });
    },
    onError: ({ error }) => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la ștergerea user-ului.",
        duration: 3000,
      });
    },
  });

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsOpenEdit(true); // Deschide dialogul de editare
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user); // Store the user object for deletion
    setIsOpenDelete(true); // Open delete confirmation dialog
  };

  const handleDeleteConfirm = () => {
    if (selectedUser !== null) {
      execute({ id: selectedUser }); // Execută ștergerea
      setIsOpenDelete(false); // Închide dialogul de ștergere
    }
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <AddUser nodes={nodes} />
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Utilizatori</CardTitle>
            <CardDescription>
              Acesta este un tabel cu toți utilizatorii din sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] sm:table-cell">ID</TableHead>
                  <TableHead>Nume</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Noduri</TableHead>
                  <TableHead>Creat la data</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {optimisticState.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="w-[100px] sm:table-cell">
                      {user.id}
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <Badge variant="success">Da</Badge>
                      ) : (
                        <Badge variant="danger">Nu</Badge>
                      )}
                    </TableCell>
                    <TableCell>{user.nodes.length}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(user)}
                          >
                            Editeaza
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(user.id)}
                          >
                            Sterge
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Totalul de useri este de {optimisticState.length}.
            </div>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Dialog pentru ștergerea utilizatorului */}
      <AlertDialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Ești sigur că dorești să ștergi acest utilizator?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Această acțiune este ireversibilă și va șterge utilizatorul din
              baza de date.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpenDelete(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Confirmă
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog pentru editarea utilizatorului */}
      {selectedUser && (
        <EditUser
          user={selectedUser}
          nodes={nodes}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
        />
      )}
    </Tabs>
  );
};

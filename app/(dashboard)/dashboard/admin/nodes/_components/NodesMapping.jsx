import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const NodesMapping = ({ nodes }) => {
  return (
    <Tabs defaultValue="all">
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Noduri</CardTitle>
            <CardDescription>
              Acesta este un tabel cu toate nodurile din sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] w-[500px] rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] sm:table-cell">
                      ID
                    </TableHead>
                    <TableHead>Nume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nodes
                    .sort((a, b) => a.id - b.id)
                    .map((node) => (
                      <TableRow key={node.id}>
                        <TableCell className="w-[100px] sm:table-cell">
                          {node.id}
                        </TableCell>
                        <TableCell>{node.name}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Totalul de noduri este de {nodes.length}
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NodesMapping;

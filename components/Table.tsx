import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export function TableData({
  data,
}: {
  data: {
    id: string;
    values: string;
    title: string;
    specificationId: string | null;
  }[];
}) {
  return (
    <Table>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium text-start text-wrap ">
              {invoice.title}
            </TableCell>
            <TableCell className="text-end">{invoice.values}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

export default function CustomTable({ headContent, children }) {
  return (
    <Table>
      <Thead>
        <Tr>
          {headContent?.map((headItem, index) => (
            <Th key={index}>{headItem}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
}

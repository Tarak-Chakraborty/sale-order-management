import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import SaleOrderModal from './SaleOrderModal';

const SaleOrders = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleAddOrder = (order) => {
    if (order.paid) {
      setCompletedOrders([...completedOrders, order]);
    } else {
      setActiveOrders([...activeOrders, order]);
    }
  };

  const handleEditOrder = (updatedOrder) => {
    if (updatedOrder.paid) {
      setCompletedOrders((prevOrders) =>
        prevOrders.some((order) => order.id === updatedOrder.id)
          ? prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
          : [...prevOrders, updatedOrder]
      );
      setActiveOrders((prevOrders) => prevOrders.filter((order) => order.id !== updatedOrder.id));
    } else {
      setActiveOrders((prevOrders) =>
        prevOrders.some((order) => order.id === updatedOrder.id)
          ? prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
          : [...prevOrders, updatedOrder]
      );
      setCompletedOrders((prevOrders) => prevOrders.filter((order) => order.id !== updatedOrder.id));
    }
  };

  const openEditModal = (order) => {
    setCurrentOrder(order);
    onOpen();
  };

  return (
    <Box>
      <Heading mb={6}>Sale Orders</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => openEditModal(null)}>+ Sale Order</Button>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price</Th>
                  <Th>Edit/View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeOrders.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>{order.customer}</Td>
                    <Td>{order.amount}</Td>
                    <Td>
                      <Button onClick={() => openEditModal(order)}>...</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Customer Name</Th>
                  <Th>Price</Th>
                  <Th>Edit/View</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completedOrders.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>{order.customer}</Td>
                    <Td>{order.amount}</Td>
                    <Td>
                      <Button onClick={() => openEditModal(order)}>...</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SaleOrderModal
        isOpen={isOpen}
        onClose={onClose}
        currentOrder={currentOrder}
        handleAddOrder={handleAddOrder}
        handleEditOrder={handleEditOrder}
      />
    </Box>
  );
};

export default SaleOrders;

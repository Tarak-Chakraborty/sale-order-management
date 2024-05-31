import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
} from '@chakra-ui/react';

const SaleOrderModal = ({ isOpen, onClose, currentOrder, handleAddOrder, handleEditOrder }) => {
  const [order, setOrder] = useState({ id: '', customer: '', amount: '', paid: false });

  useEffect(() => {
    if (currentOrder) {
      setOrder(currentOrder);
    } else {
      setOrder({ id: '', customer: '', amount: '', paid: false });
    }
  }, [currentOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, paid: checked }));
  };

  const handleSubmit = () => {
    if (currentOrder) {
      handleEditOrder(order);
    } else {
      handleAddOrder({ ...order, id: Date.now().toString() });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{currentOrder ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Customer Details
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl id="customer" mb="4">
                  <FormLabel>Customer</FormLabel>
                  <Input name="customer" value={order.customer} onChange={handleChange} />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Order Amount
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl id="amount" mb="4">
                  <FormLabel>Amount</FormLabel>
                  <Input name="amount" value={order.amount} onChange={handleChange} />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <Checkbox isChecked={order.paid} onChange={handleCheckboxChange} mr={40}>Paid</Checkbox>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            {currentOrder ? 'Update' : 'Create'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;

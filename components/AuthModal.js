import * as React from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";

const AuthModal = ({ children, hideModal, visible }) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      {children}
    </Provider>
  );
};

export default AuthModal;

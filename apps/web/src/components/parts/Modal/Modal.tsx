import { styled } from "~/styled-system/jsx";
import {
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  modalTitleStyle,
  modalBodyStyle,
  modalFooterStyle,
  modalCloseButtonStyle,
} from "~/styles/modal";

export const ModalOverlay = styled("div", modalOverlayStyle);
export const ModalContent = styled("div", modalContentStyle);
export const ModalHeader = styled("div", modalHeaderStyle);
export const ModalTitle = styled("h2", modalTitleStyle);
export const ModalBody = styled("div", modalBodyStyle);
export const ModalFooter = styled("div", modalFooterStyle);
export const ModalCloseButton = styled("button", modalCloseButtonStyle);

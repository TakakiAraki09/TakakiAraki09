import {
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  type Signal,
} from "@builder.io/qwik";
import { Popup, PopupGroup } from "./interface";

const popupGroupContext = createContextId<Signal<PopupGroup[]>>(
  "global.popup.group.context",
);

const popupContext = createContextId<Signal<Popup[]>>("global.popup.context");

export const useProvidePopupContext = () => {
  const group = useSignal<PopupGroup[]>([]);
  const popup = useSignal<Popup[]>([]);
  useContextProvider(popupGroupContext, group);
  useContextProvider(popupContext, popup);
};

const usePopupContext = () => {
  const group = useContext(popupGroupContext);
  const popup = useContext(popupContext);
  return {
    group,
    popup,
  };
};

const usePopupValue = (): Popup[] => {
  const { popup } = usePopupContext();
  return popup.value;
};
const useAddPopup = (newPopup: Popup) => {
  const { popup: popupSignal } = usePopupContext();
  return () => {
    popupSignal.value = [newPopup, ...popupSignal.value];
  };
};

const useSetPopup = (popup: Popup[]) => {
  const { popup: popupSignal } = usePopupContext();
  return () => {
    popupSignal.value = popup;
  };
};
const useDeletePopup = (popupId: string) => {
  const { popup: popupSignal } = usePopupContext();
  return () => {
    popupSignal.value = popupSignal.value.filter(
      (popup) => popup.popupId !== popupId,
    );
  };
};

const usePopupGroupValue = (): PopupGroup[] => {
  const { group } = usePopupContext();
  return group.value;
};

const useSetPopupGroup = (popupGroup: Popup[]) => {
  const { group } = usePopupContext();
  return () => {
    group.value = popupGroup;
  };
};

const useAddPopupGroup = (newPopupGroup: PopupGroup) => {
  const { group: groupSignal } = usePopupContext();
  return () => {
    groupSignal.value = [newPopupGroup, ...groupSignal.value];
  };
};
const useDeletePopupGroup = (groupId: string) => {
  const { group: groupSignal } = usePopupContext();
  return () => {
    groupSignal.value = groupSignal.value.filter(
      (group) => group.groupId !== groupId,
    );
  };
};

export const usePopup = {
  set: useSetPopup,
  value: usePopupValue,
  add: useAddPopup,
  delete: useDeletePopup,
};

export const usePopupGroup = {
  set: useSetPopupGroup,
  value: usePopupGroupValue,
  add: useAddPopupGroup,
  delete: useDeletePopupGroup,
};

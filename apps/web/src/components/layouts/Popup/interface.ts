
export interface PopupGroup {
  groupId: string;
  iconUrl: string;
  title: string;
}

export interface Popup {
  popupId: string;
  groupId: string;
  iconUrl: string;
  title: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  isClicked: boolean;
}
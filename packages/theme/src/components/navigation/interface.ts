export interface Item {
  target: 'external' | 'internal';
  label: string;
  href: string;
  icon?: string;
}

export interface Navigation {
  items: Item[];
}

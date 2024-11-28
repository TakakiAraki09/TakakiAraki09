interface BaseRecord<Type extends string> {
  id: string;
  type: Type;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

export interface RecordEmpty extends BaseRecord<'empty'> {}

export interface RecordMarkdown extends BaseRecord<'markdown'> {
  value: string;
}

export interface RecordText
  extends BaseRecord<'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
  value: string;
}

export interface RecordImage extends BaseRecord<'image'> {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface RecordSplit extends BaseRecord<'split'> {
  items: {
    records: RecordEmpty['id'][];
    width: number;
  }[];
}

export interface RecordToggleList extends BaseRecord<'toggle-list'> {
  records: RecordEmpty['id'][];
}

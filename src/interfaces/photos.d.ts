export type Photo = {
  id: string;
  createDate: number;
  title: string;
  caption: string;
  tags: string[];
  fileName: string;
  fileType: string;
  synced?: boolean;
};

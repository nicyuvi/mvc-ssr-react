export type GlobalData = Record<string, never>;

export type ServerSideProps = GlobalData;

// todo: specify data shape
export type RenderFunctionType = (
  url: string,
  data: GlobalData
) => {
  appHTML: string;
};

export interface PostMetaData {
  slug?: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  summary: string;
}

export interface Post extends PostMetaData {
  html: string;
}

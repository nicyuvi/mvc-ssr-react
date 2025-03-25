export interface ServerSideProps {
  user?: { id: string; name: string };
  posts?: { id: number; title: string }[];
}

// todo: specify data shape
export type RenderFunctionType = (
  url: string,
  data: Record<string, unknown>
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

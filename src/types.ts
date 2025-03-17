export interface ServerSideProps {
  user?: { id: string; name: string };
  posts?: { id: number; title: string }[];
}

export interface StaticContextType {
  url: string;
  status: number;
}

// todo: specify data shape
export type RenderFunctionType = (
  url: string,
  data: Record<string, unknown>
) => {
  appHTML: string;
  context: StaticContextType;
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

export interface ServerSideProps {
  user?: { id: string; name: string };
  posts?: { id: number; title: string }[];
}

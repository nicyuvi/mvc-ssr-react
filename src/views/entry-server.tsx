import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerSideProps } from '../types'; //TODO: make relative imports for types in tsconfig
import App from './App';

export function render(url: string, serverSideProps: ServerSideProps) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App serverSideProps={serverSideProps} />
      </StaticRouter>
    </StrictMode>
  );
  return { html };
}

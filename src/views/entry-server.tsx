import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerSideProps } from '../types'; //TODO: make relative imports for types in tsconfig
import App from './App';

export function render(url: string, serverSideProps: ServerSideProps) {
  const context = {};
  const appHTML = renderToString(
    <StrictMode>
      <StaticRouter location={url} context={context}>
        <App serverSideProps={serverSideProps} />
      </StaticRouter>
    </StrictMode>
  );

  return { appHTML, context };
}

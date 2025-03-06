export default {
  '*.{ts,tsx,js,jsx}': [
    () => 'npm run typecheck:client',
    () => 'npm run typecheck:server',
    'eslint --cache --max-warnings=0',
    'prettier --write',
  ],
  '*.{json,css,md}': ['prettier --write'],
};

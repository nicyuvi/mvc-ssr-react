export default {
  '*.{ts,tsx,js,jsx}': [
    'eslint --cache --max-warnings=0',
    () => 'npm run typecheck',
    'prettier --write',
  ],
  '*.{json,css,md}': ['prettier --write'],
};

export const corsConstants = {
  origin:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${process.env.CLIENT_PORT}`
      : ['https://todo-apps.com'],
};

export const formatValidationErrors = (errors) => {
  const formattedErrors = errors.map(error => {
    const path = error.path.join('.');
    const message = error.message;

    return { path, message };
  });

  return formattedErrors;
}
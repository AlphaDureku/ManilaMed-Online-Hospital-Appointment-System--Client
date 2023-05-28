export function ErrorHandler(error) {
  const { status } = error.response;
  console.log(status);
}

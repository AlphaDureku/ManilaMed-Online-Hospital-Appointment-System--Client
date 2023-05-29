export function ErrorHandler(error, setShowUnauthorizedModal) {
  const { status } = error.response;

  switch (status) {
    case 500:
      console.log(status);
      break;
    case 401:
      console.log(status);
      break;
    default:
      break;
  }
}

export function ErrorHandler(error, setShowUnauthorizedModal) {
  const { status } = error.response;

  switch (status) {
    case 500:
      window.location.href = "/serverDown";
      break;
    case 401:
      console.log(status);
      break;
    default:
      break;
  }
}

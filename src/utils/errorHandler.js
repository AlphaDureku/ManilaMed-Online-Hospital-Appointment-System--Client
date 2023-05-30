export function ErrorHandler(error, setShowExpire) {
  const { status } = error.response;

  switch (status) {
    case 500:
      // window.location.href = "/serverDown";
      break;
    case 401:
      setShowExpire(true);
      break;
    default:
      break;
  }
}

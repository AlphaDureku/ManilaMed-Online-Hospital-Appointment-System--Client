export default function SecondPage(props) {
  return (
    <>
      <div
        onClick={() => {
          props.setCurrentPage(1);
        }}
      >
        2nd Page
      </div>
    </>
  );
}

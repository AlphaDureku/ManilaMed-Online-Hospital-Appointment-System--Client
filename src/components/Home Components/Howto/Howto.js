function Howto() {
  return (
    <div className="Howto" id="HowTo">
      <div className="container-fluid pb-4 mb-2 " id="howtobg">
        <div className="row p-4 mb-4  ">
          <div className="tagtitle mt-2 ">How to set an Appointment </div>
        </div>

        <div
          id="myCarousel"
          className="carousel carousel-dark slide pb-5 mb-4"
          data-bs-ride="carousel"
          data-bs-interval="10000"
        >
          <div className="carousel-indicators mt-4">
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="2"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="3"
            ></button>
             <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="4"
            ></button>
          </div>
          <div className="carousel-inner mb-2">
            <div className="carousel-item active">
              <p>See our offered service</p>
            </div>

            <div className="carousel-item">
              <p>
              Search for a doctor and view their schedule

              </p>
            </div>
            <div className="carousel-item">
              <p> 
              Book an appointment by choosing your desired availability

              </p>
            </div>

            <div className="carousel-item">
              <p>
              Tell us about yourself. Enter the necessary
                information.
              </p>
            </div>
            <div className="carousel-item">
              <p>
                An SMS will be sent to your contact number for appointment confirmatiion
              </p>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Howto;

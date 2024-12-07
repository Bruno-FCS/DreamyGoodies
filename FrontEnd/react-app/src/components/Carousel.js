import offer1 from "../assets/offer1.png";
import offer2 from "../assets/offer2.png";
import offer3 from "../assets/offer3.png";

const Carousel = () => {
  return (
    <div id="carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            id="carousel-img-1"
            src={offer1}
            className="d-block w-100 carousel-set-img1"
            alt="Offer 1"
          />
        </div>
        <div className="carousel-item">
          <img
            id="carousel-img-2"
            src={offer2}
            className="d-block w-100 carousel-set-img1"
            alt="Offer 2"
          />
        </div>
        <div className="carousel-item">
          <img
            id="carousel-img-3"
            src={offer3}
            className="d-block w-100 carousel-set-img1"
            alt="Offer 3"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

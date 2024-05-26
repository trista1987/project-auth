import { Carousel } from "antd";

const imageStyle = {
  width: "100%",
  height: "500px",
  objectFit: "cover",
};

export const HomePage = ({ checkAuth }) => (
  <main>
    <h1>
      {checkAuth() ? `Nice to see you again!` : `Welcome to Authentication`}
    </h1>
    <Carousel autoplay>
      <div>
        <img
          src="/photo1.jpg"
          alt="Slide 1"
          style={imageStyle}
        />
      </div>
      <div>
        <img
          src="/photo2.jpg"
          alt="Slide 2"
          style={imageStyle}
        />
      </div>
      <div>
        <img
          src="/photo3.jpg"
          alt="Slide 3"
          style={imageStyle}
        />
      </div>
      <div>
        <img
          src="/photo4.jpg"
          alt="Slide 4"
          style={imageStyle}
        />
      </div>
    </Carousel>
  </main>
);

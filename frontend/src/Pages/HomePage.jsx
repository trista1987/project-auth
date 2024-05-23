import { Carousel } from "antd";

const imageStyle = {
  width: "100%",
  height: "500px",
  objectFit: "cover",
};

export const HomePage = () => (
  <Carousel autoplay>
    <div>
      <img
        src="https://images.unsplash.com/photo-1519671282429-b44660ead0a7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Slide 1"
        style={imageStyle}
      />
    </div>
    <div>
      <img
        src="https://plus.unsplash.com/premium_photo-1678914045640-55a120a8f849?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Slide 1"
        style={imageStyle}
      />
    </div>
    <div>
      <img
        src="https://plus.unsplash.com/premium_photo-1681830684950-54e3adbc9f2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Slide 1"
        style={imageStyle}
      />
    </div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Slide 1"
        style={imageStyle}
      />
    </div>
  </Carousel>
);

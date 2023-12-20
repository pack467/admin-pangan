import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";

export interface SlideShowProps {
  images: string[];
}

export default function SlideShow({ images }: SlideShowProps) {
  return (
    <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
      {images.map((el, idx) => (
        <LazyLoadImage key={idx} src={el} alt={`Slide ${idx + 1}`} />
      ))}
    </Slider>
  );
}

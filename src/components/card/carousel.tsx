import { Carousel } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { CarrouselWithProduct } from "../../interfaces/product";

export interface CarouselCardProps {
  carrousel: CarrouselWithProduct;
}

export default function CarouselCard({ carrousel }: CarouselCardProps) {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <LazyLoadImage
          src={
            carrousel.Product.ProductImgs.find(
              (el) => el.imageId === carrousel.imageId
            )?.imageUrl as string
          }
          style={{ objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>{carrousel.Product.name}</h3>
          <p>{carrousel.Product.desc}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

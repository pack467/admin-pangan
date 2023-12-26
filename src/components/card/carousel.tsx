import { Carousel, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { CarrouselWithProduct } from "../../interfaces/product";
import { useDispatch } from "react-redux";
import LoadingWrapper from "../loaders/loadingOverlay";
import { useState } from "react";
import { deleteCarousel } from "../../actions/product";
import { swalError } from "../../lib/swal";

export interface CarouselCardProps {
  carrousel: CarrouselWithProduct;
}

export default function CarouselCard({ carrousel }: CarouselCardProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const remove = () => {
    setLoading(true);

    dispatch<any>(deleteCarousel(carrousel.imageId, carrousel.productId))
      .catch((err: Error) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <LoadingWrapper active={loading}>
      <Carousel.Item interval={1000}>
        <Button
          type="button"
          variant="danger"
          className="btn btn-danger"
          onClick={remove}
        >
          Delete
        </Button>
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
    </LoadingWrapper>
  );
}

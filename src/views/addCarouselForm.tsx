import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import { RootReducer } from "../store";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { addCarousel, getAllProduct } from "../actions/product";
import { swalError } from "../lib/swal";

type imgs = {
  imageId: string;
  imageUrl: string;
};

export default function AddCarousel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { products } = useSelector(
    ({ productReducer }: RootReducer) => productReducer
  );

  const imgs = products.reduce(
    (accumulator: imgs[], product) =>
      accumulator.concat(
        product.ProductImgs.map(({ imageId, imageUrl }) => ({
          imageId,
          imageUrl,
        }))
      ),
    []
  );

  useEffect(() => {
    if (!products.length) dispatch<any>(getAllProduct({}));
  }, [products, dispatch]);

  const handler = (imageId: string) => {
    setLoading(true);
    dispatch<any>(
      addCarousel({
        imageId: imageId,
        productId: products
          .find((product) =>
            product.ProductImgs.some((el) => el.imageId === imageId)
          )
          ?.ProductImgs.find((el) => el.imageId === imageId)
          ?.productId as string,
      })
    )
      .then(() => {
        navigate("/");
      })
      .catch((err: Error) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoadingWrapper active={loading}>
      <Container>
        <Row>
          {imgs.map((el) => (
            <Col key={el.imageId} sm="12" md="3" lg="4">
              <LazyLoadImage
                className="w-25 h-25 img-fluid"
                color="blue"
                alt="Selected"
                src={el.imageUrl}
                onClick={() => handler(el.imageId)}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Button
        type="submit"
        variant="primary"
        className="btn btn-primary"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
    </LoadingWrapper>
  );
}

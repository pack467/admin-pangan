import { useSelector, useDispatch } from "react-redux";
import type { RootReducer } from "../store";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/card/productCard";
import { useEffect } from "react";
import { getAllCarousel, getAllProduct } from "../actions/product";
import CarouselCard from "../components/card/carousel";

export default function Home() {
  const dispatch = useDispatch();
  const { products, carrousels } = useSelector(
    ({ productReducer }: RootReducer) => productReducer
  );

  useEffect(() => {
    dispatch<any>(getAllProduct({}));
    dispatch<any>(getAllCarousel());
  }, []);

  return (
    <Container fluid>
      <Row>
        {!!carrousels.length &&
          carrousels.map((carrousel) => (
            <Col key={carrousel.imageId}>
              <CarouselCard carrousel={carrousel} />
            </Col>
          ))}
      </Row>
      <Row>
        {!!products.length &&
          products.map((product) => (
            <Col key={product.UUID}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

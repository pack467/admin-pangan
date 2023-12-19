import { useSelector, useDispatch } from "react-redux";
import type { RootReducer } from "../store";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/card/productCard";
import { useEffect } from "react";
import { getAllProduct } from "../actions/product";

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector(
    ({ productReducer }: RootReducer) => productReducer
  );

  useEffect(() => {
    if (!products.length) dispatch<any>(getAllProduct({}));
  }, [dispatch, products]);

  return (
    <Container>
      <Row>
        {!!products.length &&
          products.map((product) => (
            <ProductCard product={product} key={product.UUID} />
          ))}
      </Row>
    </Container>
  );
}

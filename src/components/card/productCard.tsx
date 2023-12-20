import type { ProductAttributesWithImages } from "../../interfaces/product";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export interface ProductCardProps {
  product: ProductAttributesWithImages;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.UUID}`);
  };

  return (
    <Card onClick={handleClick} className="mb-2">
      <Card.Img variant="top" src={product.ProductImgs[0].imageUrl} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.desc}</Card.Text>
        <Container>
          <Row>
            <Col md="4" sm="4" lg="4">
              {product.status}
            </Col>
            <Col md="4" sm="4" lg="4">
              {product.price}
            </Col>
            <Col md="4" sm="4" lg="4">
              {product.stock}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

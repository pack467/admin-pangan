import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import type { ProductAttributesWithImages } from "../interfaces/product";
import { getProductById, updateProduct } from "../actions/product";
import { swalError } from "../lib/swal";
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  FormSelect,
  Button,
} from "react-bootstrap";
import SlideShow from "../components/card/slider";
import TextForm from "../components/form/textForm";
import NumberForm from "../components/form/numberForm";
import { useDispatch } from "react-redux";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import type { ProductImgAttributes } from "../interfaces/productImg";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState<ProductAttributesWithImages>({
    name: "",
    ProductImgs: [] as ProductImgAttributes[],
    desc: "",
    status: "available",
    stock: 0,
    price: 0,
  } as ProductAttributesWithImages);
  const [updated, setUpdated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setData(await getProductById(id as string));
      } catch (err) {
        swalError((err as Error)?.message || "Internal Server error");
        navigate("/");
      }
    })();

    return () => setUpdated(false);
  }, [id, navigate]);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUpdated(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    dispatch<any>(updateProduct(data, data.UUID))
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
      <Card className="mb-2">
        {!!(data as ProductAttributesWithImages).ProductImgs?.length ? (
          (data as ProductAttributesWithImages).ProductImgs?.length > 1 ? (
            <SlideShow
              images={
                data?.ProductImgs.map(({ imageUrl }) => imageUrl) as string[]
              }
            />
          ) : (
            <Card.Img
              variant="top"
              src={
                (data as ProductAttributesWithImages)?.ProductImgs[0].imageUrl
              }
            />
          )
        ) : null}
        <Form onSubmit={onSubmit}>
          <Card.Body>
            <Card.Title>
              <TextForm
                value={data.name}
                onChange={onChangeHandler}
                placeHolder="product-name"
                label="Product name"
                id="product-name"
                name="name"
                required={false}
              />
            </Card.Title>
            <Card.Text>
              <TextForm
                value={data.desc}
                onChange={onChangeHandler}
                placeHolder="product-desc"
                label="Product desc"
                id="product-desc"
                name="desc"
                required={false}
              />
            </Card.Text>
            <Container>
              <Row>
                <Col md="4" sm="4" lg="4">
                  <FormSelect
                    className="mb-4"
                    name="status"
                    value={data.status}
                    id="status"
                    size="lg"
                    required={false}
                    onChange={onChangeHandler}>
                    <option disabled value="">
                      -- Select status product --
                    </option>
                    {["available", "not available", "preorder"].map(
                      (el, idx) => (
                        <option key={idx} value={el}>
                          {el}
                        </option>
                      )
                    )}
                  </FormSelect>
                </Col>
                <Col md="4" sm="4" lg="4">
                  <NumberForm
                    value={data.price}
                    onChange={onChangeHandler}
                    placeHolder="product-price"
                    label="Product price"
                    id="product-price"
                    name="price"
                    required={false}
                  />
                </Col>
                <Col md="4" sm="4" lg="4">
                  <NumberForm
                    value={data.stock}
                    onChange={onChangeHandler}
                    placeHolder="product-stock"
                    label="Product stock"
                    id="product-stock"
                    name="stock"
                    required={false}
                  />
                </Col>
              </Row>
            </Container>
          </Card.Body>
          {updated ? (
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleBack}
              type="button"
              className="btn btn-primary">
              Back
            </Button>
          )}
        </Form>
      </Card>
    </LoadingWrapper>
  );
}

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import type { CreateProductInput } from "../interfaces/product";
import { useDispatch, useSelector } from "react-redux";
import type { RootReducer } from "../store";
import { useNavigate } from "react-router-dom";
import { getAllProductTypes } from "../actions/productTypes";
import { Container, Row, Col, FormSelect, Button } from "react-bootstrap";
import TextForm from "../components/form/textForm";
import NumberForm from "../components/form/numberForm";
import { ImageInput } from "../interfaces";
import ImageForm from "../components/form/imageForm";
import { addProduct } from "../actions/product";
import LoadingWrapper from "../components/loaders/loadingOverlay";
import { swalError } from "../lib/swal";

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productTypes } = useSelector(
    ({ productTypeReducer }: RootReducer) => productTypeReducer
  );
  const [data, setData] = useState<CreateProductInput>({
    name: "",
    price: 0,
    desc: "",
    stock: 0,
    typeId: "",
  });
  const [images, setImages] = useState<ImageInput[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!productTypes.length)
      (async () => await dispatch<any>(getAllProductTypes()))();
  }, [dispatch, productTypes.length]);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    dispatch<any>(addProduct({ ...data, image: images })).then(() => {
        navigate('/')
    })
      .catch((err: any) =>
        swalError((err as unknown as any)?.message || "Internal Server Errors")
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoadingWrapper active={loading}>
      <Container>
        <Row>
          <Col md="6" lg="12">
            <form onSubmit={onSubmit}>
              <ImageForm
                setNewImage={setImages}
                images={images}
                id="imageForm"
                label="Choose File"
              />
              <TextForm
                value={data.name}
                onChange={onChangeHandler}
                placeHolder="product-name"
                label="Product name"
                id="product-name"
                name="name"
              />
              <TextForm
                value={data.desc}
                onChange={onChangeHandler}
                placeHolder="product-desc"
                label="Product desc"
                id="product-desc"
                name="desc"
              />
              <FormSelect
                className="mb-4"
                name="typeId"
                value={data.typeId}
                id="typeId"
                size="lg"
                required
                onChange={onChangeHandler}>
                <option disabled value="">
                  -- Select type product --
                </option>
                {productTypes.map((el) => (
                  <option key={el.UUID} value={el.UUID}>
                    {el.type}
                  </option>
                ))}
              </FormSelect>
              <NumberForm
                value={data.price}
                onChange={onChangeHandler}
                placeHolder="product-price"
                label="Product price"
                id="product-price"
                name="price"
              />
              <NumberForm
                value={data.stock}
                onChange={onChangeHandler}
                placeHolder="product-stock"
                label="Product stock"
                id="product-stock"
                name="stock"
              />
              <Button
                variant="primary"
                className="btn btn-primary"
                type="submit">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </LoadingWrapper>
  );
}

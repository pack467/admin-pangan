import type { ImageInput } from "../../interfaces";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  type ChangeEvent,
} from "react";
import LoadingWrapper from "../loaders/loadingOverlay";
import { Form, Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NOIMAGES } from "../../constant";

export interface FormImageProps {
  setNewImage: Dispatch<SetStateAction<ImageInput[]>>;
  id: string;
  label: string;
  images: ImageInput[];
}

export default function ImageForm({
  setNewImage,
  id,
  label,
  images,
}: FormImageProps) {
  const [progress, setProgress] = useState<number>(0);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if(images.length >= 4) return

    const files = e.target.files;
    if (files?.length && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onprogress = (ev) => {
        if (ev.lengthComputable) setProgress((ev.loaded / ev.total) * 100);
      };

      reader.onload = () => {
        setNewImage((prev) => [
          ...prev,
          {
            file: files[0],
            fileReader: reader.result,
          },
        ]);
      };
    }
  };

  return (
    <>
      <LoadingWrapper active={progress < 100 && progress !== 0}>
        <Form.Group controlId={`formImage-${id}`}>
          <Form.Label style={{ cursor: "pointer" }}>
            {label}
          </Form.Label>
          {images.length ? (
            <Container>
              <Row>
                {images.map((img,idx) => (
                  <Col md="3" lg="1" sm="6" key={idx} >
                    <LazyLoadImage
                      src={img.fileReader as string}
                      color="blue"
                      alt="Selected"
                      className="img-fluid"
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            <LazyLoadImage
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              src={NOIMAGES}
              color="blue"
              alt="Selected"
            />
          )}
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handler}
            multiple
          />
        </Form.Group>
      </LoadingWrapper>
    </>
  );
}

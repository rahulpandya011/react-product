import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useProductDetail } from '../../hooks';

const DetailProduct = () => {
  const navigate = useNavigate();
  let { product_id } = useParams();

  const { isLoading, data } = useProductDetail(
    {
      product_id,
    },
    () => {},
    (error) => {
      toast.error(error.message);
      navigate('/dashboard');
    }
  );

  return (
    <>
      <Row>
        <Col
          className="text-start"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/dashboard');
          }}>
          <span>Go Back</span>
        </Col>
      </Row>

      <h1>Product Detail</h1>
      {isLoading ? (
        'We can add Component for Loader here'
      ) : (
        <Row>
          <Col xs={6}>
            <img
              src={data.data.image}
              className="card-img-top"
              alt={data.data.name}
              style={{
                width: 'auto',
                height: '400px',
              }}
            />
          </Col>
          <Col xs={6}>
            <h1>{data.data.name}</h1>
            <div className="mt-2">
              <h5>
                <b>Stock</b> : {data.data.quantity}
              </h5>
              <h5>
                <b>Price</b> : {data.data.price}
              </h5>
              {data.data.product_variations.map((key, index1) => {
                return (
                  <h5 key={index1}>
                    <b>{key.attribute_name}</b> : {key.attribute_variation_name}
                  </h5>
                );
              })}
              <Button type="button" className="btn btn-primary">
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};
export default DetailProduct;

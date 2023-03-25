import { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import { useProductList } from '../../hooks';

const ListProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const navigate = useNavigate();

  const { isLoading, refetch } = useProductList(
    {
      page: currentPage,
    },
    (res) => {
      setData(res.data.product_list);
      setPaginationData(res.data.pagination);
    }
  );

  const handleClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <>
      <h1>List Product</h1>
      {isLoading ? (
        'We can add Component for Loader here'
      ) : (
        <>
          <Row>
            {!isLoading &&
              data.map((item, index) => {
                return (
                  <Col key={index} lg={4} md={3}>
                    <div className="card-group w-100 h-150">
                      <Card>
                        <Card.Header
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleClick(item.product_id)}>
                          {item.name}
                        </Card.Header>
                        <Card.Body
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleClick(item.product_id)}>
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt={item.name}
                            style={{
                              width: '50%',
                              height: '50%',
                            }}
                          />
                          <div className="mt-2">
                            <h5>
                              <b>Stock</b> : {item.quantity}
                            </h5>
                            <h5>
                              <b>Price</b> : {item.price}
                            </h5>
                            {item.product_variations.map((key, index1) => {
                              return (
                                <h5 key={index1}>
                                  <b>{key.attribute_name}</b> : {key.attribute_variation_name}
                                </h5>
                              );
                            })}
                          </div>
                        </Card.Body>
                        <Card.Footer>
                          <Button type="button" className="btn btn-primary">
                            Add to Cart
                          </Button>
                        </Card.Footer>
                      </Card>
                    </div>
                  </Col>
                );
              })}
          </Row>
          <Row className="mt-2">
            <Col className="text-center">
              <Pagination
                activePage={paginationData?.current_page ? paginationData?.current_page : 0}
                itemsCountPerPage={paginationData?.per_page ? paginationData?.per_page : 0}
                totalItemsCount={paginationData?.total ? paginationData?.total : 0}
                onChange={(currentPage) => {
                  setCurrentPage(currentPage);
                  refetch();
                }}
                pageRangeDisplayed={8}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First Page"
                lastPageText="Last Lage"
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ListProduct;

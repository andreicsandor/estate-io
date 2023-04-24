import { 
  React, 
  useState, 
  useEffect 
} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  Col, 
  Row 
} from 'reactstrap';

import api from '../Api';


function News(args) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/api/news/')
        setArticles(response.data);
      } catch (error) {
        console.error('An error occurred while fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div style={{ margin: '100px' }}></div>
      <div className='news-wrapper'>
        <Row>
          {articles.map(article => (
            <Col sm="6" key={article.id}>
              <Card className='subcard-custom'>
                <CardBody>
                  <CardTitle tag="h5" className='mb-4'>{article.title}</CardTitle>
                  <CardText className='lead'>{article.body}</CardText>
                  <CardText>
                    <small className="text-muted">{new Date(article.created).toLocaleString()}</small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default News;
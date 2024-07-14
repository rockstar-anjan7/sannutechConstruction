import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Import Firestore instance from Firebase
import { doc, getDoc } from 'firebase/firestore';
import '../Css/DetailPage.css'; // Import your custom CSS for DetailPage styling

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'product', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <Card className="product-detail-card">
        <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
        <Card.Body>
          <Card.Title className="text-center">{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailPage;

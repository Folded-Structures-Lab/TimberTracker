import React from 'react';
import CustomNavbar from './CustomNavbar';
import { Container } from 'react-bootstrap';

export const ComingSoon = () => {
  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
          <h1>Coming Soon!</h1>
      </Container>
    </>
  );
};

export default ComingSoon;

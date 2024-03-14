import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import CustomNavbar from './CustomNavbar';
import { Container } from 'react-bootstrap';
import rehypeRaw from 'rehype-raw';


export const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/content/about.md')
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
      </Container>
    </>
  );

//   return ;
};

export default About;
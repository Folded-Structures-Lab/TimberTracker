import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import CustomNavbar from './CustomNavbar';
import { Container } from 'react-bootstrap';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'


const useMarkdownFile = (path) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then(setMarkdown);
  }, [path]);

  return markdown;
};
  
export const DemandData = () => {
  const mdOverview = useMarkdownFile('/content/demand_data/0_overview.md');
  const mdDwelling = useMarkdownFile('/content/demand_data/1_dwelling_type.md');
  const mdTimberDwelling = useMarkdownFile('/content/demand_data/2_timber_dwellings.md');

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{mdOverview}</ReactMarkdown>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{mdDwelling}</ReactMarkdown>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{mdTimberDwelling}</ReactMarkdown>
      </Container>
    </>
  );

};

export default DemandData;
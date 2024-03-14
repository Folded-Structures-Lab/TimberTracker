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
  
export const SupplyData = () => {
  const mdOverview = useMarkdownFile('/content/supply_data/0_overview.md');
  const mdForest = useMarkdownFile('/content/supply_data/1_forest.md');
  const mdSawmill = useMarkdownFile('/content/supply_data/2_sawmill.md');

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{mdOverview}</ReactMarkdown>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{mdForest}</ReactMarkdown>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{mdSawmill}</ReactMarkdown>
      </Container>
    </>
  );

};

export default SupplyData;
import React from 'react';

const TestPage = () => {
  console.log('TestPage component rendered');
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page</h1>
      <p>If you can see this, routing is working!</p>
    </div>
  );
};

export default TestPage;

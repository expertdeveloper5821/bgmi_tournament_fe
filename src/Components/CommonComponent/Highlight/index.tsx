import React from 'react';

const Highlight = ({ text = '', highlight = '' }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts
        .filter((part) => part)
        .map((w, i) =>
          regex.test(w) ? (
            <span key={i} style={{ backgroundColor: '#ff7a00' }}>
              {w}
            </span>
          ) : (
            w
          ),
        )}
    </span>
  );
};

export default Highlight;

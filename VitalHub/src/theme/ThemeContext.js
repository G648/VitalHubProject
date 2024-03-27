import React, { createContext, useState, useContext } from 'react';

// Defina um contexto de tema
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    colors: {
      primary: '#49B3BA',
      primaryV1: "#34898F",
      primaryV2: '#60BFC5',
      primaryV3: '#77CACF',
      secondary: '#496BBA',
      secondaryV1: '#344F8F',
      secondaryV2: '#496BBA',
      secondaryV3: '#37791CF',
      grayV1: '#33303E',
      grayV2: '#4E4B59',
      grayV3: '#5F5C6B',
      grayV4: '#7A7786',
      grayV5: '#ACABB7',
      grayV6: '#C6C5CE',
      white: '#FAFAFA',
      primaryLight: '#007bff',
      secondaryLight: '#6c757d',
      background: '#f8f9fa',
      text: '#343a40',
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

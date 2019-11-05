import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { BaseProvider, createTheme, lightThemePrimitives } from 'baseui';
import 'normalize.css';

const engine = new Styletron();

const theme = createTheme({
  ...lightThemePrimitives
});

const ThemeProvider: React.FC<{}> = ({ children }) => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={theme}>{children}</BaseProvider>
  </StyletronProvider>
);

export default ThemeProvider;

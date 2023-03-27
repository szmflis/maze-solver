import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'

/*
  Layout is a style entry point of the application.
  GlobalStyle handles setting all the fonts,
  font size base values,
  resetting margins/padding setting box-sizing
  and other things one would want.
*/

/*
  fontface's are specified in external css file at /styles/global-static-styles.css
  and loaded into index.js and not specified here becouse
  there is a problem with loading them using createGlobalStyle
  https://github.com/react-boilerplate/react-boilerplate/issues/2552
  https://github.com/styled-components/styled-components/issues/1593
*/

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${theme.fontSizeBase};
  }

  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
    width: auto!important;
    overflow-x: hidden!important;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  body {
    font-family: ${theme.fonts.nunito};
    background: ${theme.colors.white};
    font-size: ${theme.fontSizeBaseRem};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.fontColorBase};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    outline: 0;
    cursor: auto;
  }
`
// https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.surfaceDarkest};
`

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
    return (
    /*
      ThemeProvider takes an object and makes it's values
      accessible through props to all styled components.
      So all values inside the passed theme (all in /styled directory)
      can be used inside any styled component.
     */
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <StyledWrapper>{props.children}</StyledWrapper>
        </ThemeProvider>
    )
}

export default Layout

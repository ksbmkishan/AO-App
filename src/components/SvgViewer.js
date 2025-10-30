import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const SvgViewer = ({ uri, style }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            background-color: transparent;
            overflow: hidden;
          }
          svg {
            width: 100%;
            height: 100%;
            display: block;
          }
        </style>
      </head>
      <body>
        <img src="${uri}" style="width:100%; height:100%;" />
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      style={[styles.webview, style]}
      scrollEnabled={false}
      backgroundColor="transparent"
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('window').width * 0.9,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default SvgViewer;

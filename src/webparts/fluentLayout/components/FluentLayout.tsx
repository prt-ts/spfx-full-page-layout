import * as React from 'react'; 
import { IFluentLayoutProps } from './IFluentLayoutProps'; 
import { Layout } from './Layout/Layout';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

export default class FluentLayout extends React.Component<IFluentLayoutProps, {}> {
  public render(): React.ReactElement<IFluentLayoutProps> {
    
    return (
      <FluentProvider theme={webLightTheme}>
        <Layout />
      </FluentProvider>
    );
  }
}

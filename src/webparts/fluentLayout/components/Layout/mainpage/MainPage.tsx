/* eslint-disable */
import * as React from 'react'
import { BreadcrumbWithOverflow } from '../breadcrumb/PageBreadcrumb'
import { makeStyles } from '@fluentui/react-components'
import { IListSubscription, ListSubscriptionFactory } from '@microsoft/sp-list-subscription'
import { Guid } from '@microsoft/sp-core-library'

let _listSubscriptionFactory: ListSubscriptionFactory;

export function setSubscriptionFactory(context: any) {
  _listSubscriptionFactory = new ListSubscriptionFactory(context);
}

const mainPageStyles = makeStyles({

  breadcrumbContainer: {
    width: "100%",
    position: "sticky",
    top: 0
  }

})

export const MainPage: React.FunctionComponent<{}> = () => {
  const onChange = React.useCallback(() => {
    alert("Hola!")
  }, []);

  useListSubscription({
    listId: "6b0e7d80-9830-4a4c-85cd-1e6514b9fb4d",
    onChange: onChange
  });
  useListSubscription({
    listId: "b6db90a3-5a74-4007-b2c0-4e6a5b6bbb2a",
    onChange : onChange
  });
  const classes = mainPageStyles();
  return (
    <div>
      <div className={classes.breadcrumbContainer}><BreadcrumbWithOverflow /></div>
    </div>
  )
}

export type ListSubscriptionProps = {
  listId: string,
  onChange?: () => void,
  onConnect?: () => void,
  onDisconnect?: (reason: string) => void
}

export const useListSubscription = (props: ListSubscriptionProps) => {
  const { listId, onChange, onConnect, onDisconnect } = props;
  const _listSubscription = React.useRef<IListSubscription>();

  const _onChangeNotification = () => {
    // code to execute when the something changes on the list or library
    console.log("New Change Notification", listId);
    onChange && onChange();
  }

  function _subscriptionConnected(): void {
    // code to execute when the subscription to the list has been established
    console.log("Connected", listId)
    onConnect && onConnect
  }

  function _subscriptionDisconnected(reason: string): void {
    // code to execute when the connection to the list has been disconnected
    console.log("Disconnected", listId, reason)
    onDisconnect && onDisconnect(reason)
  }

  async function createListSubscription() {
    _listSubscription.current = await _listSubscriptionFactory.createSubscription({
      listId: Guid.parse(listId),
      callbacks: {
        notification: _onChangeNotification,
        connect: _subscriptionConnected,
        disconnect: _subscriptionDisconnected
      }
    });
  }

  React.useEffect(() => {
    console.log("creating subscription")
    createListSubscription()

    return () => {
      console.log("removing subscription");
    }
  }, []);

  return {
    _listSubscription
  } as const;

}
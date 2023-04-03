import { useRef, useContext, useEffect } from 'react';
import { KeepAliveContext } from './keep-alive-component';
import { AliveComponentsStateState } from './types';
import type { FC } from "react"

export type KeepAliveTransfrom = (Component: FC, componentId: string) => FC;

export const keepAlive: KeepAliveTransfrom = (Component, id) => {
  return (props) => {
    const wraperRef = useRef<HTMLDivElement>(null)
    const { aliveComponentsState, setAliveComponentState } = useContext(KeepAliveContext);

    const componentValue = aliveComponentsState[id];

    useEffect(() => {
      if (!componentValue) {
        setAliveComponentState({
          id,
          reactElement: <Component {...props} />,
          nodes: null,
          state: AliveComponentsStateState.CREATE
        });
        return;
      }
      // dom 挂载后将已经渲染的真实 dom 通过 appendChild 迁移到当前位置
      if (componentValue && componentValue.nodes) {
        componentValue.nodes.forEach(node => {
          wraperRef.current.appendChild(node);
        })
      }
    }, [componentValue, wraperRef, Component, props]);


    return <div ref={wraperRef}></div>;
  }
}
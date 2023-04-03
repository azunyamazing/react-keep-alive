import { createContext, ReactNode, useCallback, useState } from "react";
import { AliveComponentsStateState } from "./types";
import type { FC, ReactElement } from "react";

export interface KeepAliveComponentProps {
  children: ReactElement;
}

export interface AliveComponentValues {
  id: string;
  nodes: Node[] | null; // 真实 dom
  reactElement: ReactNode;
  state: AliveComponentsStateState;
}
export type AliveComponentsState = Record<string, AliveComponentValues>;

export const KeepAliveContext = createContext<{
  aliveComponentsState: AliveComponentsState;
  setAliveComponentState(values: AliveComponentValues): void;
}>(null);

export const KeepAlive: FC<KeepAliveComponentProps> = (props) => {
  const [aliveComponentsState, setAliveComponentsState] = useState<AliveComponentsState>({});

  const setAliveComponentState = useCallback((values: AliveComponentValues) => {
    setAliveComponentsState(state => {
      return {
        ...state,
        [values.id]: values,
      }
    });
  }, []);

  return (
    <KeepAliveContext.Provider value={{
      aliveComponentsState,
      setAliveComponentState
    }}>
      {props.children}
      {Object.values(aliveComponentsState).map(values => (
        <div ref={(node) => {
          if (node && !values.nodes) {
            setAliveComponentState({
              ...values,
              nodes: [...node.childNodes],
              state: AliveComponentsStateState.CREATED
            })
          }
        }} className={values.id}>{values.reactElement}</div>
      ))}
    </KeepAliveContext.Provider>
  )
}
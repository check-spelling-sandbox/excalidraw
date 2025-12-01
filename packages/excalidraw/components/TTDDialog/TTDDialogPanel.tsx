import clsx from "clsx";

import { Button } from "../Button";
import Spinner from "../Spinner";

import type { ReactNode } from "react";

interface TTDDialogPanelProps {
  label: string;
  children: ReactNode;
  panelAction?: {
    label: string;
    action: () => void;
    icon?: ReactNode;
  };
  panelActionDisabled?: boolean;
  onTextSubmitInProgress?: boolean;
  renderTopRight?: () => ReactNode;
  renderSubmitShortcut?: () => ReactNode;
  renderBottomRight?: () => ReactNode;
}

export const TTDDialogPanel = ({
  label,
  children,
  panelAction,
  panelActionDisabled = false,
  onTextSubmitInProgress,
  renderTopRight,
  renderSubmitShortcut,
  renderBottomRight,
}: TTDDialogPanelProps) => {
  return (
    <div className="ttd-dialog-panel">
      <div className="ttd-dialog-panel__header">
        <label>{label}</label>
        {renderTopRight?.()}
      </div>

      {children}
      <div
        className={clsx("ttd-dialog-panel-button-container", {
          invisible: !panelAction,
        })}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Button
          className="ttd-dialog-panel-button"
          onSelect={panelAction ? panelAction.action : () => {}}
          disabled={panelActionDisabled || onTextSubmitInProgress}
        >
          <div className={clsx({ invisible: onTextSubmitInProgress })}>
            {panelAction?.label}
            {panelAction?.icon && <span>{panelAction.icon}</span>}
          </div>
          {onTextSubmitInProgress && <Spinner />}
        </Button>
        {!panelActionDisabled &&
          !onTextSubmitInProgress &&
          renderSubmitShortcut?.()}
        {renderBottomRight?.()}
      </div>
    </div>
  );
};

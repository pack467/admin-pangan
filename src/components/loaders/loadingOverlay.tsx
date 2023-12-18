import LoadingOverlayWrapper from "react-loading-overlay-ts";
import type { ReactNode } from "react";

export interface LoadingWrapperProps {
  children: ReactNode;
  active: boolean;
  text?: string;
  className?: string;
}

export default function LoadingWrapper({
  children,
  active,
  text = "",
  className = "",
}: LoadingWrapperProps) {
  return (
    <LoadingOverlayWrapper
      active={active}
      spinner
      text={text}
      className={className}
    >
      {children}
    </LoadingOverlayWrapper>
  );
}

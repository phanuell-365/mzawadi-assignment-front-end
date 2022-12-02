export interface ModalOptions {
  placement: "center" | "top-center" | "bottom-left";
  backdrop: "dynamic" | "static";
  backdropClasses: string;

  onHide(): void;

  onShow(): void;

  onToggle(): void;
}

export interface PropsOptions {
  options: ModalOptions;
}

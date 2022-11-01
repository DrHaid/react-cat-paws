export type CatCanvasProps = {
  height?: number;
  width?: number;
};

export type CatPawsProps = {
  onClose?: () => void;
  fillScreen?: boolean;
};

export enum EasingType {
  LINEAR,
  IN_OUT_SINE,
}

export interface T_LTWH {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface T_Scaled {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  width: number;
  height: number;
}

export interface T_Position {
  boundingRect: T_LTWH;
  rects: Array<T_LTWH>;
  pageNumber: number;
}

export interface T_ScaledPosition {
  boundingRect: T_Scaled;
  rects: Array<T_Scaled>;
  pageNumber: number;
  usePdfCoordinates?: boolean;
}

export interface T_NewHighlight {
  position: T_ScaledPosition;
  content: {
    text?: string;
    image?: string;
  };
  comment: {
    text: string;
    emoji: string;
  };
}

export interface T_Highlight extends T_NewHighlight {
  id: string;
}

export interface T_ViewportHighlight extends T_Highlight {
  position: T_Position;
}

export interface T_VIEWPORT {
  convertToPdfPoint: (x: number, y: number) => Array<number>;
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>;
  width: number;
  height: number;
}

export interface T_PDFJS_Viewer {
  container: HTMLDivElement;
  viewer: HTMLDivElement;
  getPageView: (
    page: number,
  ) => {
    textLayer: { textLayerDiv: HTMLDivElement };
    viewport: T_VIEWPORT;
    div: HTMLDivElement;
    canvas: HTMLCanvasElement;
  };
  setDocument: (document: T_PDFJS_Document) => Promise<void>;
  scrollPageIntoView: (options: { pageNumber: number; destArray: Array<mixed> }) => void;
  currentScaleValue: string;
}

export interface T_PDFJS_Document {
  numPages: number;
}

export interface T_PDFJS_LinkService {
  setDocument: (document: Object) => void;
  setViewer: (viewer: T_PDFJS_Viewer) => void;
}

export interface T_PDFJS {
  TextLayerBuilder: {
    protointerface: {
      _bindMouse: () => void;
    };
  };
  PDFViewer: (options: Object) => T_PDFJS_Viewer;
  PDFLinkService: () => T_PDFJS_LinkService;
  getDocument: (url: string) => Promise<T_PDFJS_Document>;
  disableWorker: boolean;
}

export interface IFiles {
  id: string;
  addedOn: number;
  fileUrl: string;
  originalFilename: string;
  size: number;
  resubmitted: boolean;
  previewUrl: string;
  previewFileName: string;
}
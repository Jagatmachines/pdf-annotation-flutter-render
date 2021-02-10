import { LoaderWrap } from 'src/utils/loaderWraper';
import {
  AreaHighlight,
  Highlight,
  PdfHighlighter,
  PdfLoader,
  Popup,
  setPdfWorker,
} from '@jagatmachines/react-pdf-highlighter';
import React from 'react';
import { showError } from 'src/utils/alertnotification';
/* eslint import/no-webpack-loader-syntax: 0 */
import PDFWorker from 'worker-loader!pdfjs-dist/lib/pdf.worker';
import {
  T_Highlight,
  T_LTWH,
  // T_NewHighlight,
  T_PDFJS_Document,
  T_Scaled,
  T_ScaledPosition,
  T_ViewportHighlight,
} from './types';

setPdfWorker(PDFWorker);
interface IPdfHighlighterComponentProps {
  pdfUrl: string;
  setUpdateHighLight: Function;
  highlights: T_Highlight[];
  rotationState: number | null;
}

const HighlightPopup = ({ comment }: any) =>
  comment.text ? <div className="Highlight__popup">{comment.text}</div> : null;

export const PdfHighlighterComponent: React.FC<IPdfHighlighterComponentProps> = ({
  pdfUrl,
  rotationState,
  highlights,
}: IPdfHighlighterComponentProps) => {
  /* const [highlights, setHightlights] = useState<T_Highlight[]>([]) */

  // const getNextId = () => String(Math.random()).slice(2);

  // const addHighlight = (highlight: T_NewHighlight) => {
  //   console.log('Saving highlight', highlight);

  //   // setHightlights([{ ...highlight, id: getNextId() }, ...highlights])
  //   setUpdateHighLight(highlight);
  // };

  // const updateHighlight = (highlightId: string, position: Object, content: Object) => {
  //   console.log('Updating highlight', highlightId, position, content);
  //   /* setHightlights(highlights.map((h: T_Highlight) => {
  //     return h.id === highlightId
  //       ? {
  //           ...h,
  //           position: { ...h.position, ...position },
  //           content: { ...h.content, ...content }
  //         }
  //       : h;
  //   })) */
  // };

  return (
    <LoaderWrap isLoading={pdfUrl === null}>
      <PdfLoader
        url={pdfUrl}
        beforeLoad={<LoaderWrap isLoading={true}>''</LoaderWrap>}
        onError={(error: Error) => {
          showError('The file you are trying to view is corrupted');
        }}
      >
        {(pdfDocument: T_PDFJS_Document) => (
          <PdfHighlighter
            // pdfScaleValue="page-width"

            pdfDocument={pdfDocument}
            enableAreaSelection={(event: MouseEvent) => {
              /* event.altKey */
            }}
            onScrollChange={() => {}}
            scrollRef={() => {}}
            showToolBar={[]}
            rotatePdf={rotationState}
            onSelectionFinished={(
              position: T_ScaledPosition,
              content: { text?: string; image?: string },
              hideTipAndSelection: () => void,
              transformSelection: () => void,
            ) => (
              <React.Fragment>
                {/* <Tip
              onOpen={transformSelection}
              onConfirm={(comment: { text: string, emoji: string }) => {
                addHighlight({ content, position, comment });
                hideTipAndSelection();
              }}
            /> */}
              </React.Fragment>
            )}
            highlightTransform={(
              highlight: T_ViewportHighlight,
              index: number,
              setTip: (highlight: T_ViewportHighlight, callback: (highlight: T_ViewportHighlight) => any) => void,
              hideTip: () => void,
              viewportToScaled: (rect: T_LTWH) => T_Scaled,
              screenshot: (position: T_LTWH) => string,
              isScrolledTo: boolean,
            ) => {
              const isTextHighlight = !Boolean(highlight.content && highlight.content.image);

              const component = isTextHighlight ? (
                <Highlight isScrolledTo={isScrolledTo} position={highlight.position} comment={highlight.comment} />
              ) : (
                <AreaHighlight
                  highlight={highlight}
                  onChange={(boundingRect: T_LTWH) => {
                    /* debugger;
                  updateHighlight(
                    highlight.id,
                    { boundingRect: viewportToScaled(boundingRect) },
                    { image: screenshot(boundingRect) }
                  ); */
                  }}
                />
              );

              return (
                <Popup
                  popupContent={<HighlightPopup {...highlight} />}
                  onMouseOver={(popupContent: any) => {
                    setTip(highlight, () => {
                      return popupContent;
                    });
                  }}
                  onMouseOut={hideTip}
                  key={index}
                  children={component}
                />
              );
            }}
            highlights={[...highlights]}
          />
        )}
      </PdfLoader>
    </LoaderWrap>
  );
};

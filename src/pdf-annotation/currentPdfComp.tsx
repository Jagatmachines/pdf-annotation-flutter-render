import React, { useEffect, useState } from 'react';
// import { getAssignmentAnnotation } from 'src/services/assignment';
// import { showError } from 'src/utils/alertnotification';
// import { isPdf } from 'src/utils/utilFunctions';
import { PdfHighlighterComponent } from './index';
import { T_Highlight, IFiles } from './types';

interface ICurrentPdfComp {
  pdfFile: IFiles | undefined;
}

export const CurrentPdfComp: React.FC<ICurrentPdfComp> = ({ pdfFile }: ICurrentPdfComp) => {
  const [hightlight, setHightlight] = useState<T_Highlight[]>([]);
  const [rotationState, setRotationState] = useState<number | null>(null);

  useEffect(() => {
    setHightlight([]);
    setRotationState(null);

    /* (async () => {
      const [err, data] = await getAssignmentAnnotation(pdfFile.id);
      if (err) showError(err);
      else if (data) {
        setHightlight(data.annotationData && data.annotationData.length ? data.annotationData : []);
        setRotationState(data.rotationState ? data.rotationState : 0);
      } else {
        setRotationState(0);
      }
    })(); */
  }, [/* pdfFile.id */]);

  // const pdfUrl = pdfFile.previewUrl && isPdf(pdfFile.previewUrl) ? pdfFile.previewUrl : pdfFile.fileUrl;

  return (
    <PdfHighlighterComponent
      highlights={hightlight}
      pdfUrl={"https://arxiv.org/pdf/1708.08021.pdf"}
      setUpdateHighLight={() => {}}
      rotationState={rotationState}
    />
  );
};

import React, { useCallback } from 'react';

import useCodeMirror from '~/hooks/useCodeMirror';

import type { EditorState } from '@codemirror/state';

interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
}

const Editor = (props: Props) => {
  const { onChange, initialDoc } = props;
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange],
  );
  const [refContainer] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  return <div ref={refContainer} />;
};

export default Editor;

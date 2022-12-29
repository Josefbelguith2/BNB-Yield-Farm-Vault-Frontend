import { useState } from 'react';

interface UseStageProps {
  stages: { [key: string]: any };
  callback?: () => any;
  default?: any;
}

export default function useStage(props: UseStageProps) {
  const { stages, callback, default: initial } = props;
  const [current, setCurrent] = useState<any>(initial);

  const setFunctions: { [key: string]: any } = {};
  Object.keys(stages).forEach((stage) => {
    setFunctions[stage] = () => {
      setCurrent(stages[stage]);
      if (callback) callback();
    };
  });

  return { current, set: setFunctions };
}

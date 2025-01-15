import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

const useConvertVideoToImageFormContext = () =>
  useFormContext<{
    fps: number;
    filename: string;
    prefix: string;
    zeroNum: number;
    outputWidth: number;
    outputHeight: number;
  }>();

const InputTick = (props: {
  value: number;
  onChange?: (value: number) => void;
}) => {
  const [fps, setFps] = useState<number>(props.value);
  return (
    <input
      type="number"
      max={244}
      min={15}
      value={fps}
      onChange={(e) => setFps(Number(e.currentTarget.value))}
    />
  );
};

export const ConvertVideoToImage = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refVideo = useRef<HTMLVideoElement>(null);
  const [file, setFile] = useState<File[] | null>(null);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.currentTarget.files == null) return;
      setFile(Array.from(event.currentTarget.files));
    },
    []
  );

  const videoSrc = useMemo(() => {
    const targetFile = (file || [])[0];
    if (targetFile == null) return;
    if (refVideo.current == null) return;
    return URL.createObjectURL(targetFile);
  }, [file]);

  const resizeVideoAndCanvas = useCallback(() => {
    if (refVideo.current == null || refCanvas.current == null) return;
    refVideo.current.width = refVideo.current.videoWidth;
    refVideo.current.height = refVideo.current.videoHeight;
    refCanvas.current.width = refVideo.current.videoWidth;
    refCanvas.current.height = refVideo.current.videoHeight;
  }, []);

  useEffect(() => {
    if (refVideo.current == null) return;
    refVideo.current.addEventListener('canplay', resizeVideoAndCanvas);

    return () => {
      if (refVideo.current == null) return;
      refVideo.current.removeEventListener('canplay', resizeVideoAndCanvas);
    };
  }, [videoSrc]);

  return (
    <div>
      <InputTick value={60} />
      <input type="file" onChange={handleChangeFile} />
      <canvas ref={refCanvas} />
      <video ref={refVideo} src={videoSrc} />
    </div>
  );
};

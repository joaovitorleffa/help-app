export type ImageProps = {
  uri: string;
};

export type GetImageInfo = {
  name: string;
  type: string;
  uri: string;
};

const getImageInfo = (image: ImageProps, name?: string): GetImageInfo => {
  const splitBars = image.uri.split('/');
  const splitBarsLastIndex = splitBars.length - 1;
  const defaultFileName = splitBars[splitBarsLastIndex];

  const splitExtension = defaultFileName.split('.');
  const splitExtensionLastIndex = splitExtension.length - 1;
  const extension = splitExtension[splitExtensionLastIndex];

  const fileName = name ? `${name}.${extension}` : defaultFileName;
  const type = `image/${extension}`;
  const { uri } = image;
  return {
    name: fileName,
    type,
    uri,
  };
};

export { getImageInfo };

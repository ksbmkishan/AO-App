export const MixedImage = ({ localSvg: SvgComponent, uri, style }) => {
  if (SvgComponent) {
    return <SvgComponent width={style?.width} height={style?.height} />;
  }

  return <Image source={{ uri }} style={style} resizeMode="contain" />;
};

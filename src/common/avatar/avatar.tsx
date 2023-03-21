/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { classnames } from 'helpers/utils';
import { Sizes } from 'common/types';
import avatarStyles from './avatar.module.scss';
import { ReactComponent as AvatarSVG } from './assets/user.svg';

type ImageProps = {
  crossOrigin?: string;
  referrerPolicy?: string;
  src?: string;
  srcSet?: string;
};
const useLoaded = ({
  crossOrigin, referrerPolicy, src, srcSet,
}: ImageProps) => {
  const [loaded, setLoaded] = useState({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded({
      loaded: false,
      error: false,
    });

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded({
        loaded: true,
        error: false,
      });
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded({
        loaded: false,
        error: true,
      });
    };

    image.crossOrigin = crossOrigin ?? null;
    image.referrerPolicy = referrerPolicy ?? '';
    image.src = src ?? '';

    if (srcSet) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return loaded;
};

type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  bgColor?: string;
  size?: Sizes;
  iconComponent?: React.ReactNode;
};

export const Avatar = React.forwardRef<HTMLElement, AvatarProps>(({
  crossOrigin, referrerPolicy, src, srcSet, alt, bgColor = '#EE1A64', color = '#FFF', size = 'm', iconComponent, ...props
}, ref) => {
  const loaded = useLoaded({
    crossOrigin, referrerPolicy, src, srcSet,
  });
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && !loaded.error;

  let children = null;

  if (hasImgNotFailing) {
    children = (
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        crossOrigin={crossOrigin}
        referrerPolicy={referrerPolicy}
        {...props}
      />
    );
  } else if (props.children !== undefined) {
    children = props.children;
  } else if (hasImg && alt) {
    children = alt[0].toUpperCase();
  } else {
    children = <AvatarSVG stroke={color} />;
  }

  return (
    <div className={avatarStyles.avatarWrapper}>
      <figure
        ref={ref}
        className={classnames(
          avatarStyles.avatar,
          avatarStyles[`avatar-${size}`],
        )}
        style={{ backgroundColor: bgColor, color }}
      >
        {children}
      </figure>
      {iconComponent ? (
        <div
          className={classnames(
            avatarStyles.avatarIcon,
            avatarStyles[`avatarIcon-${size}`],
          )}
        >
          {iconComponent}
        </div>
      ) : null}
    </div>
  );
});

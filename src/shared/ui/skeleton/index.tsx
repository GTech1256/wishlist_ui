import React, { PropsWithChildren } from "react";
import SkeletonAnt, { SkeletonProps } from "antd/es/skeleton";
import "antd/es/spin/style/index.css";
import "antd/es/skeleton/style/index.css";

interface OwnProps extends SkeletonProps {
  id?: string;
}

type Props = OwnProps;

const Skeleton = (props: PropsWithChildren<Props>) => {
  return <SkeletonAnt active title={false} {...props} />;
};

export default Skeleton;

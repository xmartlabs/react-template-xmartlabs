import { cn } from "@/helpers/utils";

export type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children = null,
  className = "",
  ...props
}) => (
  <div
    className={cn(
      `2xl:w-[96rem]) mx-auto w-full px-4 sm:w-[40rem] md:w-[48rem] lg:w-[64rem] xl:w-[80rem]`,
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

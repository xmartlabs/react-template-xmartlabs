import { cn } from "@/helpers/utils";

export type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const Container = ({
  children,
  className = "",
  ...props
}: ContainerProps) => (
  <div
    className={cn(
      `mx-auto w-full px-4 sm:w-[40rem] md:w-[48rem] lg:w-[64rem] xl:w-[80rem] 2xl:w-[96rem]`,
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
